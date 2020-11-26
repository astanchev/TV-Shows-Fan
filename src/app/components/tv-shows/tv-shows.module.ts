import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';
import { TvShowsRoutingModule } from './tv-shows-routing.module';



@NgModule({
  declarations: [
    TvShowsListComponent
  ],
  imports: [
    CommonModule,
    TvShowsRoutingModule
  ]
})
export class TvShowsModule { }
