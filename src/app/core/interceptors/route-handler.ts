import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Injectable()
export class RouteHandlerInterceptor implements HttpInterceptor {
    private apiURL: string = environment.backendless.url;
    private contentHeaders = { 'Content-Type': 'application/json' };
    private tokenHeaders = { 'user-token': this.userService.userToken };
    private tokenContentHeaders = {
        'Content-Type': 'application/json',
        'user-token': this.userService.userToken
    };

    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const fullURL = request.url.includes('http') ? request.url : `${this.apiURL}/${request.url}`;

        request = request.clone({ url: fullURL });

        if (request.url.endsWith('login') || request.url.endsWith('register')) {
            request = request.clone({ setHeaders: this.contentHeaders });
        } else if (request.url.endsWith('logout') || request.url.endsWith('userroles')) {
            request = request.clone({ setHeaders: this.tokenHeaders });
        } else if (request.url.endsWith('show')) {
            request = request.clone({ setHeaders: this.tokenContentHeaders });
        }

        return next.handle(request);
    }
}