import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { ITvShow } from 'src/app/core/interfaces/tv-show';
import { IUserLogin } from 'src/app/core/interfaces/user-login';
import { TvShowService } from 'src/app/core/services/tv-show.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tv-shows-detail',
  templateUrl: './tv-shows-detail.component.html',
  styleUrls: ['./tv-shows-detail.component.css']
})
export class TvShowsDetailComponent implements OnInit {
  tvshowID = '';
  tvshowName = '';
  loadingComments: boolean;
  tvshow: ITvShow;
  user: IUserLogin;
  isFan = false;
  isVotedForShow = false;

  userSub$: Observable<IUserLogin>;
  tvshowSub$: Observable<ITvShow>;

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tvshowService: TvShowService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tvshowID = params.id;
    });

    this.userSub$ = this.userService.getUserByID().pipe(tap((data) => { this.user = data; }));
    this.tvshowSub$ = this.tvshowService
      .getTVShowByID(this.tvshowID)
      .pipe(
        tap((tvshow) => {
          this.tvshowName = tvshow.name;
        }),
        tap(_ => {
          this.isFan = !!this.user.fanGroups ? this.user.fanGroups.includes(this.tvshowName) : false;
          this.isVotedForShow = !!this.user.likedShows ? this.user.likedShows.includes(this.tvshowName) : false;
        }),
        tap((data) => { this.tvshow = data; })
      );

    this.userSub$.pipe(mergeMap(() => this.tvshowSub$)).subscribe();
  }

  joinFanGroup(): void {
    this.userService.joinFanGroup(this.tvshowName).subscribe(() => this.ngOnInit());
  }

  leaveFanGroup(): void {
    this.userService.leaveFanGroup(this.tvshowName).subscribe(() => this.ngOnInit());
  }

  upVote(): void {
    this.userService.likeTVShow(this.tvshowName, this.tvshowID).subscribe(() => this.ngOnInit());
  }

  downVote(): void {
    this.userService.dislikeTVShow(this.tvshowName, this.tvshowID).subscribe(() => this.ngOnInit());
  }

  deleteTVShow(): void {
    this.tvshowService.deleteTVShow(this.tvshowID).subscribe();
    this.router.navigate(['tv-shows']);
  }


  showLoader(loadComments: boolean): void {
    this.loadingComments = loadComments;
  }

}