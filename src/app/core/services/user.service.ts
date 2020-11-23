import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../core/interfaces/user';
import { IUserLogin } from '../../core/interfaces/user-login';
import { StorageService } from './storage.service';

@Injectable()
export class UserService implements OnDestroy {
  username: string = '';
  userId: string = '';
  userToken: string = '';

  loginSub: Subscription;
  registerSub: Subscription;
  logoutSub: Subscription;

  private contentHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private tokenHttpOptions = {
    headers: new HttpHeaders({ 'user-token': this.userToken })
  };

  constructor(
    private storage: StorageService,
    private http: HttpClient) {
    this.username = this.storage.getItem('username');
    this.userId = this.storage.getItem('userId');
    this.userToken = this.storage.getItem('userToken');
  }

  get isLogged() {
    return !!this.userToken;
  }

  get isAdmin() {
    if (!this.isLogged) {
      return false;
    }

    let userRoles: string[] = [];
    const url: string = environment.backendless.url + environment.backendless.endpoints.userRoles;

    this.http.get<string[]>(url, this.tokenHttpOptions).subscribe((data) => userRoles.concat(data));

    if (userRoles.includes('Administrator')) {
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

    const url: string = environment.backendless.url + environment.backendless.endpoints.login;

    this.loginSub = this.http
      .post<IUserLogin>(url, JSON.stringify(user), this.contentHttpOptions)
      .subscribe(data => {
        this.username = data.username;
        this.userId = data.objectId;
        this.userToken = data["user-token"];
        this.storage.setItem('username', data.username);
        this.storage.setItem('userId', data.objectId);
        this.storage.setItem('userToken', data["user-token"]);
      });
  }

  register(username: string, password: string): void {
    const user = {
      username: username,
      password: password
    };

    const url: string = environment.backendless.url + environment.backendless.endpoints.register;

    this.registerSub = this.http
      .post<IUser>(url, JSON.stringify(user), this.contentHttpOptions)
      .subscribe(data => {
        this.login(username, password);
      });

  }

  logout(): void {
    const url: string = environment.backendless.url + environment.backendless.endpoints.logout;

    this.logoutSub = this.http
      .get(url, this.tokenHttpOptions)
      .subscribe(_ => {
        this.username = '';
        this.userId = '';
        this.userToken = '';
        this.storage.setItem('username', '');
        this.storage.setItem('userId', '');
        this.storage.setItem('userToken', '');
      });
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
    this.registerSub.unsubscribe();
    this.logoutSub.unsubscribe();
  }
}
