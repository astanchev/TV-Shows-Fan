import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-user-comments-count',
  templateUrl: './user-comments-count.component.html',
  styleUrls: ['./user-comments-count.component.css']
})
export class UserCommentsCountComponent implements OnInit {
  @Input() userId: string;
  userCommentsCount: number;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentService.getCommentsByUser(this.userId).subscribe((count) => this.userCommentsCount = count);
  }

}
