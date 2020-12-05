import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../../core/interfaces/user';
import { IUserLogin } from '../../core/interfaces/user-login';
import { IComment } from '../interfaces/comment';
import { IReturnedComment } from '../interfaces/returned-comment';
import { ITvShow } from '../interfaces/tv-show';
import { IUpdateUser } from '../interfaces/update-user';
import { IUserCommentStatus } from '../interfaces/user-comment-status';
import { IUserDisplay } from '../interfaces/user-display';
import { CommentService } from './comment.service';
import { StorageService } from './storage.service';
import { TvShowService } from './tv-show.service';

@Injectable()
export class UserService {
  username = '';
  userId = '';
  userToken = '';
  isAdministrator = false;

  constructor(
    private storage: StorageService,
    private tvshowService: TvShowService,
    private commentService: CommentService,
    private http: HttpClient,
    private router: Router) {

    this.username = this.storage.getItem('username') || '';
    this.userId = this.storage.getItem('userId') || '';
    this.userToken = this.storage.getItem('userToken') || '';
    this.isAdministrator = this.storage.getItem('isAdministrator') || false;
  }

  get isLogged(): boolean {
    return !!this.userToken;
  }

  get isAdmin(): boolean {
    return this.isAdministrator;
  }

  get isUser(): boolean {
    if (this.isLogged && !this.isAdmin) {
      return true;
    }
    return false;
  }

  login(username: string, password: string): void {
    const user = {
      login: username,
      password
    };

    const url: string = environment.backendless.endpoints.login;

    this.http
      .post<IUserLogin>(url, JSON.stringify(user))
      .pipe(tap((data) => {
        this.username = data.username;
        this.userId = data.objectId;
        this.userToken = data['user-token'];
        this.storage.setItem('username', data.username);
        this.storage.setItem('userId', data.objectId);
        this.storage.setItem('userToken', data['user-token']);
        this.getUserRoles();
      }))
      .subscribe(_ => {
        this.router.navigate(['/']);
      });
  }

  register(username: string, email: string, password: string): void {
    const user = {
      username,
      email,
      password
    };

    const url: string = environment.backendless.endpoints.register;

    this.http
      .post<IUser>(url, JSON.stringify(user))
      .subscribe(_ => {
        this.login(username, password);
      });

  }

  logout(): void {
    const url: string = environment.backendless.endpoints.logout;

    this.http
      .get(url)
      .subscribe(_ => {
        this.username = '';
        this.userId = '';
        this.userToken = '';
        this.isAdministrator = false;
        this.storage.setItem('username', '');
        this.storage.setItem('userId', '');
        this.storage.setItem('userToken', '');
        this.storage.setItem('isAdministrator', false);

        this.router.navigate(['/login']);
      });
  }

  getUserRoles(): void {
    const url: string = environment.backendless.endpoints.userRoles;

    this.http.get<string[]>(url)
      .subscribe(
        (data) => {
          if (data.indexOf('Administrator') > -1) {
            this.isAdministrator = true;
            this.storage.setItem('isAdministrator', true);
          } else {
            this.isAdministrator = false;
            this.storage.setItem('isAdministrator', false);
          }
        });
  }

  getUserByID(): Observable<IUserLogin> {
    const url: string = environment.backendless.endpoints.user + `/${this.userId}`;

    return this.http.get<IUserLogin>(url);
  }

  getAllUsers(page: number): Observable<IUserDisplay[]> {
    const searchAddOn = `&where=${escape(`username != 'Administrator'`)}`;
    const pagingQuery = `?pageSize=3&offset=${(page - 1) * 3}`;
    const url = environment.backendless.endpoints.user + pagingQuery + searchAddOn;

    return this.http.get<IUserLogin[]>(url)
      .pipe(
        map((data: IUserLogin[]) => data.map((u) => {
          return {
            username: u.username,
            userID: u.objectId,
            email: u.email,
            fanOf: u.likedShows ? u.likedShows.split(', ') : [],
            isAllowedCommenting: u.allowCommenting
          };
        })));
  }

  getAllUsersCount(): Observable<number> {
    const searchAddOn = `?where=${escape(`username != 'Administrator'`)}`;
    const countQuery = `&property=Count(username)`;
    const url = environment.backendless.endpoints.user + searchAddOn + countQuery;

    return this.http.get<number>(url);
  }

  getUserLikedComments(): Observable<IReturnedComment> {
    const propAddon = '?property=likedComments';
    const url: string = environment.backendless.endpoints.updateUser + `/${this.userId}` + propAddon;

    return this.http.get<IReturnedComment>(url);
  }

  getUserCommentStatus(): Observable<IUserCommentStatus> {
    const propAddon = '?property=allowCommenting';
    const url: string = environment.backendless.endpoints.updateUser + `/${this.userId}` + propAddon;

    return this.http.get<IUserCommentStatus>(url);
  }

  updateUserData(user: IUpdateUser): Observable<IUserLogin> {
    const url: string = environment.backendless.endpoints.updateUser + `/${this.userId}`;

    return this.http
      .put<IUserLogin>(url, JSON.stringify(user));
  }

  joinFanGroup(tvshowName: string): Observable<IUserLogin> {
    const url: string = environment.backendless.endpoints.updateUser + `/${this.userId}`;

    return this.getUserByID().pipe(
      switchMap(
        (user: IUserLogin) => {
          const fanGroups: string[] = !!user.fanGroups ?
            user.fanGroups
              .split(', ')
              .filter(x => x !== '') :
            [];
          fanGroups.push(tvshowName);
          return this.http.put<IUserLogin>(url, JSON.stringify({ fanGroups: fanGroups.join(', ') }));
        }
      )
    );
  }

  leaveFanGroup(tvshowName: string): Observable<IUserLogin> {
    const url: string = environment.backendless.endpoints.updateUser + `/${this.userId}`;

    return this.getUserByID().pipe(
      switchMap(
        (user: IUserLogin) => {
          let fanGroups: string[] = !!user.fanGroups ?
            user.fanGroups
              .split(', ')
              .filter(x => x !== '') :
            [];
          fanGroups = fanGroups.filter(t => t !== tvshowName);
          return this.http.put<IUserLogin>(url, JSON.stringify({ fanGroups: fanGroups.join(', ') }));
        }
      )
    );
  }

  likeTVShow(tvshowName: string, tvshowID: string): Observable<IUserLogin> {
    const urlUser: string = environment.backendless.endpoints.updateUser + `/${this.userId}`;

    const tvshowSub$ = this.tvshowService.getTVShowByID(tvshowID)
      .pipe(
        switchMap(
          (tvShow: ITvShow) => {
            const likes: number = tvShow.likes;
            const data = { likes: likes + 1 };

            return this.tvshowService.updateTVShow(data, tvshowID);
          }
        )
      );

    const userSub$ = this.getUserByID().pipe(
      switchMap(
        (user: IUserLogin) => {
          const likedShows: string[] = !!user.likedShows ?
            user.likedShows
              .split(', ')
              .filter(x => x !== '') :
            [];

          likedShows.push(tvshowName);
          return this.http.put<IUserLogin>(urlUser, JSON.stringify({ likedShows: likedShows.join(', ') }));
        }
      )
    );

    return tvshowSub$.pipe(concatMap(() => userSub$));
  }

  dislikeTVShow(tvshowName: string, tvshowID: string): Observable<IUserLogin> {
    const urlUser: string = environment.backendless.endpoints.updateUser + `/${this.userId}`;

    const tvshowSub$ = this.tvshowService.getTVShowByID(tvshowID)
      .pipe(
        switchMap(
          (tvShow: ITvShow) => {
            const dislikes: number = tvShow.dislikes;
            const data = { dislikes: dislikes + 1 };

            return this.tvshowService.updateTVShow(data, tvshowID);
          }
        )
      );

    const userSub$ = this.getUserByID().pipe(
      switchMap(
        (user: IUserLogin) => {
          const likedShows: string[] = !!user.likedShows ?
            user.likedShows
              .split(', ')
              .filter(x => x !== '') :
            [];

          likedShows.push(tvshowName);
          return this.http.put<IUserLogin>(urlUser, JSON.stringify({ likedShows: likedShows.join(', ') }));
        }
      )
    );

    return tvshowSub$.pipe(concatMap(() => userSub$));
  }

  likeComment(commentID: string): Observable<IComment> {
    const urlUser: string = environment.backendless.endpoints.updateUser + `/${this.userId}`;

    const commentSub$ = this.commentService.getCommentById(commentID)
      .pipe(
        switchMap(
          (comment: IComment) => {
            const likes: number = comment.likes;
            const data = { likes: likes + 1 };

            return this.commentService.updateComment(data, commentID);
          }
        )
      );

    const userSub$ = this.getUserByID().pipe(
      switchMap(
        (user: IUserLogin) => {
          const likedComments: string[] = !!user.likedComments ?
            user.likedComments
              .split(', ')
              .filter(x => x !== '') :
            [];

          likedComments.push(commentID);
          return this.http.put<IUserLogin>(urlUser, JSON.stringify({ likedComments: likedComments.join(', ') }));
        }
      )
    );

    return userSub$.pipe(concatMap(() => commentSub$));
  }

  dislikeComment(commentID: string): Observable<IComment> {
    const urlUser: string = environment.backendless.endpoints.updateUser + `/${this.userId}`;

    const commentSub$ = this.commentService.getCommentById(commentID)
      .pipe(
        switchMap(
          (comment: IComment) => {
            const dislikes: number = comment.dislikes;
            const data = { dislikes: dislikes + 1 };

            return this.commentService.updateComment(data, commentID);
          }
        )
      );

    const userSub$ = this.getUserByID().pipe(
      switchMap(
        (user: IUserLogin) => {
          const likedComments: string[] = !!user.likedComments ?
            user.likedComments
              .split(', ')
              .filter(x => x !== '') :
            [];

          likedComments.push(commentID);
          return this.http.put<IUserLogin>(urlUser, JSON.stringify({ likedComments: likedComments.join(', ') }));
        }
      )
    );

    return userSub$.pipe(concatMap(() => commentSub$));
  }

  changeUserCommentStatus(userID: string, allow: boolean): Observable<IUserLogin>{
    const url: string = environment.backendless.endpoints.updateUser + `/${userID}`;

    return this.http.put<IUserLogin>(url, JSON.stringify({ allowCommenting: allow }));
  }

}
