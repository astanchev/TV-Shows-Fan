import { Component, OnInit } from '@angular/core';
import { ITvShow } from 'src/app/core/interfaces/tv-show';
import { TvShowService } from 'src/app/core/services/tv-show.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tv-shows-list',
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.css']
})
export class TvShowsListComponent implements OnInit {
  loading: boolean = true;
  tvshows: ITvShow[];
  totalTVShows: number;
  pageSize: number = 5;
  page: number = 1;

  get isAdmin() {
    return this.userService.isAdmin;
  }

  constructor(
    private userService: UserService,
    private tvshowService: TvShowService
  ) { }

  ngOnInit(): void {
  }

  getTVShows(tvshows: ITvShow[]) {
    this.tvshows = tvshows;
    this.tvshowService.getTVShowsCount().subscribe((data) => this.totalTVShows = data);
  }

  showLoading(loading: boolean) {
    this.loading = loading;
  }

  getPage(event) {
    this.page = event;
  }
}
