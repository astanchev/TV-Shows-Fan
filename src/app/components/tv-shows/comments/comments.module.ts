import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/core/material/material.module';
import { CommentsItemComponent } from './comments-item/comments-item.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentsNewComponent } from './comments-new/comments-new.component';



@NgModule({
  declarations: [
    CommentsListComponent,
    CommentsItemComponent,
    CommentsNewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommentsListComponent,
    CommentsItemComponent,
    CommentsNewComponent
  ]
})
export class CommentsModule { }
