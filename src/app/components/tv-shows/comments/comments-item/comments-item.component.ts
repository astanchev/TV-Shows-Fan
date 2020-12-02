import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from 'src/app/core/interfaces/comment';
import { CommentService } from 'src/app/core/services/comment.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-comments-item',
  templateUrl: './comments-item.component.html',
  styleUrls: ['./comments-item.component.css']
})
export class CommentsItemComponent implements OnInit {
  @Input() comment: IComment;
  @Output() deleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  get isOwner(): boolean {
    return this.comment.ownerId === this.userService.userId;
  }

  constructor(
    private userService: UserService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
  }

  deleteComment(): void {
    this.commentService.deleteComment(this.comment.objectId).subscribe(_ => this.deleted.emit(true));
  }

}
