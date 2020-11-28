import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../../core/interfaces/user';
import { IUserLogin } from '../../core/interfaces/user-login';
import { IUpdateUser } from '../interfaces/update-user';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  private user: IUserLogin;

  username: string = '';
  userId: string = '';
  userToken: string = '';
  isAdministrator: boolean = false;

  constructor(
    private storage: StorageService,
    private http: HttpClient,
    private router: Router) {

    this.username = this.storage.getItem('username') || '';
    this.userId = this.storage.getItem('userId') || '';
    this.userToken = this.storage.getItem('userToken') || '';
    this.isAdministrator = this.storage.getItem('isAdministrator') || false;
  }

  get isLogged() {
    return !!this.userToken;
  }

  get isAdmin() {
    return this.isAdministrator;
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

    this.http
      .post<IUserLogin>(url, JSON.stringify(user))
      .pipe(tap((data) => {
        this.user = data;
        this.username = data.username;
        this.userId = data.objectId;
        this.userToken = data["user-token"];
        this.storage.setItem('username', data.username);
        this.storage.setItem('userId', data.objectId);
        this.storage.setItem('userToken', data["user-token"]);
        this.getUserRoles();
      }))
      .subscribe(_ => {
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

    this.http
      .post<IUser>(url, JSON.stringify(user))
      .subscribe(_ => {
        this.login(username, password);
      });

  }

  logout(): void {
    const url: string = environment.backendless.endpoints.logout;

    this.http
      .get(url)
      .subscribe(_ => {
        this.user = null;

        this.username = '';
        this.userId = '';
        this.userToken = '';
        this.isAdministrator = false;
        this.storage.setItem('username', '');
        this.storage.setItem('userId', '');
        this.storage.setItem('userToken', '');
        this.storage.setItem('isAdministrator', false);

        this.router.navigate(['/login']);
      });
  }

  getUserRoles(): void {
    const url: string = environment.backendless.endpoints.userRoles;

    this.http.get<string[]>(url)
      .subscribe(
        (data) => {
          if (data.indexOf('Administrator') > -1) {
            this.isAdministrator = true;
            this.storage.setItem('isAdministrator', true);
          } else{
            this.isAdministrator = false;
            this.storage.setItem('isAdministrator', false);
          }
        });
  }

  getUserByID(): Observable<IUserLogin> {
    const url: string = environment.backendless.endpoints.user + `/${this.userId}`;

    return this.http.get<IUserLogin>(url);
  }

  updateUserData(user: IUpdateUser): Observable<IUserLogin> {
    const url: string = environment.backendless.endpoints.updateUser + `/${this.userId}`;

    return this.http
      .put<IUserLogin>(url, JSON.stringify(user))
      .pipe(
        tap((data) => this.user = data)
      );
  }

}
