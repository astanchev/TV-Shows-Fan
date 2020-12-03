import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/core/interfaces/comment';
import { IReturnedComment } from 'src/app/core/interfaces/returned-comment';
import { CommentService } from 'src/app/core/services/comment.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-comments-item',
  templateUrl: './comments-item.component.html',
  styleUrls: ['./comments-item.component.css']
})
export class CommentsItemComponent implements OnInit {
  @Input() comment: IComment;
  @Input() likedComments$: Observable<IReturnedComment>;
  @Output() deleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  isVotedComment = false;

  get isOwner(): boolean {
    return this.comment.ownerId === this.userService.userId;
  }

  constructor(
    private userService: UserService,
    private commentService: CommentService
  ) {
  }

  ngOnInit(): void {
    this.likedComments$.subscribe((data) => this.isVotedComment = data.likedComments ?
      data.likedComments.includes(this.comment.objectId) :
      false);
  }


  deleteComment(): void {
    this.commentService.deleteComment(this.comment.objectId).subscribe(_ => this.deleted.emit(true));
  }


  upVoteComment(): void {
    this.userService.likeComment(this.comment.objectId).subscribe((data) => {
      this.comment = data;
      this.ngOnInit();
    });
  }

  downVoteComment(): void {
    this.userService.dislikeComment(this.comment.objectId).subscribe((data) => {
      this.comment = data;
      this.ngOnInit();
    });
  }

}
