import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IComment } from '../interfaces/comment';
import { ITvShow } from '../interfaces/tv-show';
import { ITvShowAdd } from '../interfaces/tv-show-add';
import { CommentService } from './comment.service';

@Injectable()
export class TvShowService {

  constructor(
    private http: HttpClient,
    private commentService: CommentService
    ) { }

  getAllTVShows(search: string, page: number): Observable<ITvShow[]> {
    const searchAddOn = search ? `&where=${escape(`category LIKE '%${search}%' OR name LIKE '%${search}%'`)}` : '';
    const pagingQuery = `?pageSize=5&offset=${(page - 1) * 5}`;
    const url: string = environment.backendless.endpoints.tvshow + pagingQuery + searchAddOn;

    return this.http.get<ITvShow[]>(url);
  }

  getTVShowsCount(): Observable<number> {
    return this.http.get<number>(environment.backendless.endpoints.countTVShows);
  }

  getTVShowByID(id: string): Observable<ITvShow> {
    const url: string = environment.backendless.endpoints.tvshow + `/${id}`;

    return this.http.get<ITvShow>(url);
  }

  createTVShow(tvshow: ITvShowAdd): Observable<ITvShow> {
    return this.http
      .post<ITvShow>(
        environment.backendless.endpoints.tvshow,
        JSON.stringify(tvshow)
      );
  }

  updateTVShow(data: any, tvshowId: string): Observable<ITvShow> {
    const url: string = environment.backendless.endpoints.tvshow + `/${tvshowId}`;

    return this.http
      .put<ITvShow>(url, JSON.stringify(data));
  }

  deleteTVShow(tvshowId: string): Observable<void> {
    const url: string = environment.backendless.endpoints.tvshow + `/${tvshowId}`;

    return this.http.delete<void>(url);
  }

  addCommentToTVShow(tvshowId: string, comment: any): Observable<number> {
    const url: string = environment.backendless.endpoints.tvshow + `/${tvshowId}/comments`;

    return this.commentService.createComment(comment)
    .pipe(
      switchMap((data: IComment) => {
        return this.http.put<number>(url, JSON.stringify([data.objectId]));
      })
    );
  }

  getTVShowCommentsCount(tvshowId: string): Observable<number> {
    const searchAddOn = `?where=${escape(`tvshow[comments].objectId = '${tvshowId}'`)}`;
    const url = environment.backendless.endpoints.countComments + searchAddOn;

    return this.http.get<number>(url);
  }

  getTVShowComments(tvshowId: string, page: number): Observable<IComment[]>{
    const pagingQuery = `?pageSize=5&offset=${(page - 1) * 5}`;
    const url = environment.backendless.endpoints.tvshow + `/${tvshowId}/comments` + pagingQuery;

    return this.http.get<IComment[]>(url);
  }

}
