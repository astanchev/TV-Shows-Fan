import { Component, Input, OnInit } from '@angular/core';
import { IUserDisplay } from 'src/app/core/interfaces/user-display';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-user-list-item]',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
  @Input() user: IUserDisplay;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  toggleBan(userId: string, allow: boolean): void {
    this.userService.changeUserCommentStatus(userId, allow)
      .subscribe((u) => {
        this.user = {
          username: u.username,
          userID: u.objectId,
          email: u.email,
          fanOf: u.likedShows ? u.likedShows.split(', ') : [],
          isAllowedCommenting: u.allowCommenting
        }
      });
  }
}
