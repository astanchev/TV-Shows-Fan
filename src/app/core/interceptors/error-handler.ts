import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private snackbar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next
                .handle(req)
                .pipe(catchError((error) => {
                        this.snackbar.open(error.error.message, 'Undo', {
                        duration: 3000
                        });
                        throw error;
                }));
    }
  }