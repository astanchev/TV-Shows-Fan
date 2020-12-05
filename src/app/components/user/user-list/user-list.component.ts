import { Component, OnInit } from '@angular/core';
import { IUserDisplay } from 'src/app/core/interfaces/user-display';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  loading = true;
  users: IUserDisplay[];
  totalUsers: number;
  pageSize = 3;
  page = 1;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsersCount().subscribe((data) => this.totalUsers = data);
  }

  getPage(event): void {
    this.page = event;
  }

  showLoading(loading: boolean): void {
    this.loading = loading;
  }

  getUsers(users: IUserDisplay[]): void {
    this.users = users;
  }
}
