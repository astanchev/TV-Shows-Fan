import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get isAdmin(): boolean {
    return  this.userService.isAdmin;
  }

  get isLogged(): boolean {
    return  this.userService.isLogged;
  }

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

}
