import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ITvShow } from 'src/app/core/interfaces/tv-show';
import { TvShowService } from 'src/app/core/services/tv-show.service';
@Component({
  selector: 'app-tv-shows-search',
  templateUrl: './tv-shows-search.component.html',
  styleUrls: ['./tv-shows-search.component.css']
})
export class TvShowsSearchComponent implements OnInit, OnChanges {
  @Output() tvshows: EventEmitter<ITvShow[]> = new EventEmitter<ITvShow[]>();
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() tvShowsCount: EventEmitter<number> = new EventEmitter<number>();
  @Input() page: number;
  search = '';

  constructor(private tvshowService: TvShowService) { }

  ngOnInit(): void {
    this.searchTVShows({search: ''});
    this.getTVShowsCount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchTVShows({search: this.search});
    this.getTVShowsCount();
  }

  searchTVShows({ search }): void {
    this.loading.emit(true);
    this.search = search;
    this.getTVShowsCount();

    this.tvshowService
      .getAllTVShows(search, this.page)
      .subscribe(data => {
        this.tvshows.emit(data);
        this.loading.emit(false);
      });
  }

  getTVShowsCount(): void {
    this.tvshowService.getTVShowsCount(this.search)
    .subscribe(data => this.tvShowsCount.emit(Number(data[0].count)));
  }

}
