import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';


const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: TvShowsListComponent
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TvShowsRoutingModule { }
