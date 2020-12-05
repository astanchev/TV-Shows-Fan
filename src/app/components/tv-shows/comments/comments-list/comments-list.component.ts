import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IComment } from 'src/app/core/interfaces/comment';
import { IReturnedComment } from 'src/app/core/interfaces/returned-comment';
import { TvShowService } from 'src/app/core/services/tv-show.service';
import { UserService } from 'src/app/core/services/user.service';
import { CommentsNewComponent } from '../comments-new/comments-new.component';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() isAdmin: boolean;
  @Input() isFan: boolean;
  @Input() tvshowID: string;
  @Output() loadComments: EventEmitter<boolean> = new EventEmitter<boolean>();
  likedComments$: Observable<IReturnedComment>;
  userCommentStatus$: Observable<boolean>;
  loading = true;
  commentText = '';
  commentsCount$: Observable<number>;
  comments: IComment[];
  pageSize = 5;
  page = 1;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private tvshowService: TvShowService
  ) {
    this.userCommentStatus$ = this.userService.getUserCommentStatus()
      .pipe(
        map((data) => data.allowCommenting));
  }

  ngOnInit(): void {
    this.loadComments.emit(true);
    this.commentsCount$ = this.tvshowService.getTVShowCommentsCount(this.tvshowID);
    this.likedComments$ = this.userService.getUserLikedComments();
    this.tvshowService.getTVShowComments(this.tvshowID, this.page)
      .subscribe((data) => {
        this.comments = data;
        this.loading = false;
        this.loadComments.emit(false);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentsNewComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const comment = {
          fromUser: this.userService.username,
          text: result
        };
        const tvshowID = this.tvshowID;
        this.tvshowService.addCommentToTVShow(tvshowID, comment).subscribe(() => this.ngOnInit());
      }
    });
  }


  getPage(event): void {
    this.page = event;
    this.updateComments();
  }

  updateComments(): void {
    this.loading = true;
    this.tvshowService
      .getTVShowComments(this.tvshowID, this.page)
      .subscribe((data) => {
        this.comments = data;
        this.loading = false;
        this.ngOnInit();
      });
  }

  deleteComment(deleted: boolean): void {
    if (deleted) {
      this.updateComments();
    }
  }

}
