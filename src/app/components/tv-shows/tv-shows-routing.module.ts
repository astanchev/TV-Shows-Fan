import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { TvShowsAddComponent } from './tv-shows-add/tv-shows-add.component';
import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';


const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: TvShowsListComponent
    },
    {
      path: 'add',
      component: TvShowsAddComponent,
      canActivate: [AdminGuard]
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TvShowsRoutingModule { }
