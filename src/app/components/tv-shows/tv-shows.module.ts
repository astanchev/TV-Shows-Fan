import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { TvShowsAddComponent } from './tv-shows-add/tv-shows-add.component';
import { TvShowsItemComponent } from './tv-shows-item/tv-shows-item.component';
import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';
import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsSearchComponent } from './tv-shows-search/tv-shows-search.component';



@NgModule({
  declarations: [
    TvShowsListComponent,
    TvShowsItemComponent,
    TvShowsSearchComponent,
    TvShowsAddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule,
    TvShowsRoutingModule
  ]
})
export class TvShowsModule { }
