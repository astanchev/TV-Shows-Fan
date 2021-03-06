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
  @Output() changedPage: EventEmitter<number> = new EventEmitter<number>();
  @Input() page: number;
  search = '';

  constructor(private tvshowService: TvShowService) { }

  ngOnInit(): void {
    this.getTVShows(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTVShows(false);
  }

  searchTVShows({ search }): void {
    this.search = search;
    this.getTVShows(true);
  }

  getTVShows(changePage: boolean): void{
    this.loading.emit(true);
    this.getTVShowsCount();

    this.tvshowService
      .getAllTVShows(this.search, this.page)
      .subscribe(data => {
        this.tvshows.emit(data);
        this.loading.emit(false);
        if (changePage) {
          this.changedPage.emit(1);
        }
      });
  }

  getTVShowsCount(): void {
    this.tvshowService.getTVShowsCount(this.search)
    .subscribe(data => this.tvShowsCount.emit(Number(data[0].count)));
  }

}
