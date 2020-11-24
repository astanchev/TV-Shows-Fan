import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin: boolean;
  isLogged: boolean;

  constructor(private userService: UserService) {
    this.isLogged = this.userService.isLogged;
    this.isAdmin = this.userService.isAdmin;
  }

  ngOnInit(): void {
  }

}
