import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITvShow } from 'src/app/core/interfaces/tv-show';
import { TvShowService } from 'src/app/core/services/tv-show.service';
@Component({
  selector: 'app-tv-shows-search',
  templateUrl: './tv-shows-search.component.html',
  styleUrls: ['./tv-shows-search.component.css']
})
export class TvShowsSearchComponent implements OnInit {
  @Output() tvshows: EventEmitter<ITvShow[]> = new EventEmitter<ITvShow[]>();
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private tvshowService: TvShowService) { }

  ngOnInit(): void {
    this.searchTVShows({search: ''});
  }

  searchTVShows({ search }): void {
    this.loading.emit(true);

    this.tvshowService
      .getAllTVShows(search)
      .subscribe(data => {
        this.tvshows.emit(data);
        this.loading.emit(false);
      });
  }

}
