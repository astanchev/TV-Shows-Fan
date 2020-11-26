import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoadGuard implements CanLoad {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {

    if (this.userService.isLogged) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }

}
