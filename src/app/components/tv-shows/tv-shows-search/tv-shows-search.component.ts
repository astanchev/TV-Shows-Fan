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
  @Input() page: number;
  search: string = '';

  constructor(private tvshowService: TvShowService) { }

  ngOnInit(): void {
    this.searchTVShows({search: ''});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchTVShows({search: this.search});
  }

  searchTVShows({ search }): void {
    this.loading.emit(true);
    this.search = search;

    this.tvshowService
      .getAllTVShows(search, this.page)
      .subscribe(data => {
        this.tvshows.emit(data);
        this.loading.emit(false);
      });
  }

}
