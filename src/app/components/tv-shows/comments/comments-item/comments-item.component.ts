import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/core/interfaces/comment';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-comments-item',
  templateUrl: './comments-item.component.html',
  styleUrls: ['./comments-item.component.css']
})
export class CommentsItemComponent implements OnInit {
  @Input() comment: IComment;

get isOwner(){
  return this.comment.ownerId === this.userService.userId;
}

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

}
