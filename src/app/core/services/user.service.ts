import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../core/interfaces/user';
import { IUserLogin } from '../../core/interfaces/user-login';
import { IUpdateUser } from '../interfaces/update-user';
import { StorageService } from './storage.service';

@Injectable()
export class UserService implements OnDestroy {
  username: string = '';
  userId: string = '';
  userToken: string = '';
  userRoles: string[] = [];

  loginSub: Subscription;
  registerSub: Subscription;
  logoutSub: Subscription;
  adminSub: Subscription;

  constructor(
    private storage: StorageService,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router) {

    this.username = this.storage.getItem('username');
    this.userId = this.storage.getItem('userId');
    this.userToken = this.storage.getItem('userToken');
  }

  get isLogged() {
    return !!this.userToken;
  }

  get isAdmin() {
    if (this.isLogged && this.userRoles.includes('Administrator')) {
      return true;
    }
    return false;
  }

  get isUser() {
    if (this.isLogged && !this.isAdmin) {
      return true;
    }
    return false;
  }

  login(username: string, password: string): void {
    const user = {
      login: username,
      password: password
    };

    const url: string = environment.backendless.endpoints.login;

    this.loginSub = this.http
      .post<IUserLogin>(url, JSON.stringify(user))
      .subscribe(data => {
        this.username = data.username;
        this.userId = data.objectId;
        this.userToken = data["user-token"];
        this.storage.setItem('username', data.username);
        this.storage.setItem('userId', data.objectId);
        this.storage.setItem('userToken', data["user-token"]);

        this.getUserRoles();

        this.router.navigate(['/']);
      });
  }

  register(username: string, email: string, password: string): void {
    const user = {
      username: username,
      email: email,
      password: password
    };

    const url: string = environment.backendless.endpoints.register;

    this.registerSub = this.http
      .post<IUser>(url, JSON.stringify(user))
      .subscribe(_ => {
        this.login(username, password);
      });

  }

  logout(): void {
    const url: string = environment.backendless.endpoints.logout;

    this.logoutSub = this.http
      .get(url)
      .subscribe(_ => {
        this.username = '';
        this.userId = '';
        this.userToken = '';
        this.userRoles = [];
        this.storage.setItem('username', '');
        this.storage.setItem('userId', '');
        this.storage.setItem('userToken', '');

        this.router.navigate(['/login']);
      });
  }

  getUserRoles(): void {
    const url: string = environment.backendless.endpoints.userRoles;

    this.adminSub = this.http.get<string[]>(url)
      .subscribe(
        (data) => { this.userRoles = this.userRoles.concat(data) });
  }

  getUserByID(): Observable<IUserLogin> {
    const url: string = environment.backendless.endpoints.user + `/${this.userId}`;

    return this.http.get<IUserLogin>(url);
  }

  updateUserData(user: IUpdateUser): Observable<IUserLogin> {
    const url: string = environment.backendless.endpoints.updateUser + `/${this.userId}`;

    return this.http.put<IUserLogin>(url, JSON.stringify(user));
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
    this.registerSub.unsubscribe();
    this.logoutSub.unsubscribe();
    this.adminSub.unsubscribe();
  }
}
