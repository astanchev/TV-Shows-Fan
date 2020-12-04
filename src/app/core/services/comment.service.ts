import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IComment } from '../interfaces/comment';

@Injectable()
export class CommentService {

  constructor(
    private http: HttpClient
    ) { }

  getCommentById(commentId: string): Observable<IComment> {
    const url: string = environment.backendless.endpoints.comment + `/${commentId}`;

    return this.http.get<IComment>(url);
  }

  getCommentsByUser(userId: string): Observable<number> {
    const searchAddOn = `?where=${escape(`ownerId='${userId}'`)}`;
    const propertyAddOn = `&property=Count(ownerId)`;
    const url: string = environment.backendless.endpoints.comment + searchAddOn + propertyAddOn;

    return this.http.get<number>(url).pipe(map((data: any) => data[0].count));
  }

  createComment(comment: any): Observable<IComment> {
    const url: string = environment.backendless.endpoints.comment;

    return this.http.post<IComment>(url, JSON.stringify(comment));
  }

  deleteComment(commentId: string): Observable<void> {
    const url: string = environment.backendless.endpoints.comment + `/${commentId}`;

    return this.http.delete<void>(url);
  }

  updateComment(data: any, commentId: string): Observable<IComment> {
    const url: string = environment.backendless.endpoints.comment + `/${commentId}`;

    return this.http.put<IComment>(url, JSON.stringify(data));
  }

}
