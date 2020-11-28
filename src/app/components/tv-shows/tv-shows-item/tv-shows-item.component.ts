import { Component, Input, OnInit } from '@angular/core';
import { ITvShow } from '../../../core/interfaces/tv-show';


@Component({
  selector: 'app-tv-shows-item',
  templateUrl: './tv-shows-item.component.html',
  styleUrls: ['./tv-shows-item.component.css']
})
export class TvShowsItemComponent implements OnInit {
  @Input() tvshow: ITvShow;

  constructor() { }

  ngOnInit(): void {
  }

}
