import { Component, OnInit } from '@angular/core';
import { ITvShow } from 'src/app/core/interfaces/tv-show';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tv-shows-list',
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.css']
})
export class TvShowsListComponent implements OnInit {
  loading: boolean = true;
  tvshows: ITvShow[];

  get isAdmin() {
    return this.userService.isAdmin;
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getTVShows(tvshows: ITvShow[]) {
    this.tvshows = tvshows;
  }

  showLoading(loading: boolean) {
    this.loading = loading;
  }
}
