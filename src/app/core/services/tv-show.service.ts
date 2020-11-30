import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITvShow } from '../interfaces/tv-show';
import { ITvShowAdd } from '../interfaces/tv-show-add';

@Injectable()
export class TvShowService {

  constructor(private http: HttpClient) { }

  getAllTVShows(search: string, page: number): Observable<ITvShow[]> {
    let searchAddOn = search ? `&where=${escape(`category LIKE '%${search}%' OR name LIKE '%${search}%'`)}` : '';
    let pagingQuery = `?pageSize=5&offset=${(page - 1) * 5}`;
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

}
