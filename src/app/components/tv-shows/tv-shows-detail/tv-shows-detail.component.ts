import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { ITvShow } from 'src/app/core/interfaces/tv-show';
import { IUserLogin } from 'src/app/core/interfaces/user-login';
import { TvShowService } from 'src/app/core/services/tv-show.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tv-shows-detail',
  templateUrl: './tv-shows-detail.component.html',
  styleUrls: ['./tv-shows-detail.component.css']
})
export class TvShowsDetailComponent implements OnInit, OnDestroy {
  tvshow: ITvShow;
  user: IUserLogin;
  routeSub: Subscription;
  tvshowName = '';
  tvshowID = '';
  isFan = false;
  isVotedForShow = false;
  loadingComments: boolean;

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
    this.routeSub = this.route.params.subscribe((params: Params) => {
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

    this.loadData();
  }

  loadData(): void{
    this.userSub$.pipe(concatMap(() => this.tvshowSub$)).subscribe();
  }

  joinFanGroup(): void {
    this.userService.joinFanGroup(this.tvshowName).subscribe(() => this.loadData());
  }

  leaveFanGroup(): void {
    this.userService.leaveFanGroup(this.tvshowName).subscribe(() => this.loadData());
  }

  upVote(): void {
    this.userService.likeTVShow(this.tvshowName, this.tvshowID).subscribe(() => this.loadData());
  }

  downVote(): void {
    this.userService.dislikeTVShow(this.tvshowName, this.tvshowID).subscribe(() => this.loadData());
  }

  deleteTVShow(): void {
    this.tvshowService.deleteTVShow(this.tvshowID).subscribe();
    this.router.navigate(['tv-shows']);
  }


  showLoader(loadComments: boolean): void {
    this.loadingComments = loadComments;
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
