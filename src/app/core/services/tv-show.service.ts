import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITvShow } from '../interfaces/tv-show';

@Injectable()
export class TvShowService {

  constructor(private http: HttpClient) { }

  getAllTVShows(search: string): Observable<ITvShow[]> {
    let searchAddOn = search ? `?where=${escape(`category LIKE '%${search}%' OR name LIKE '%${search}%'`)}` : '';
    const url: string = environment.backendless.endpoints.tvshow + searchAddOn;

    return this.http.get<ITvShow[]>(url);
  }
}
