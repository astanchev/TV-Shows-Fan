import { Component } from '@angular/core';
import { ITvShow } from 'src/app/core/interfaces/tv-show';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tv-shows-list',
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.css']
})
export class TvShowsListComponent {
  loading = true;
  tvshows: ITvShow[];
  totalTVShows = 0;
  pageSize = 5;
  page = 1;

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  constructor(
    private userService: UserService
  ) { }

  getTVShows(tvshows: ITvShow[]): void {
    this.tvshows = tvshows;
  }

  showLoading(loading: boolean): void {
    this.loading = loading;
  }

  getPage(event): void {
    this.page = event;
  }

  getTVShowsCount(event): void {
    this.totalTVShows = event;
  }

  getChangedPage(event): void {
    this.page = event;
  }

}
