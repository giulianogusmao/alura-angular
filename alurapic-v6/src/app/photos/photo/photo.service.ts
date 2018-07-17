import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from "./photo";

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private _api = 'http://localhost:3000';

  constructor(
    private _http: HttpClient
  ) { }

  listFromUser(username: string) {
    return this._http
      .get<Photo[]>(`${this._api}/${username}/photos`);
  }

  listFromUserPaginated(username: string, page: number) {
    const params = new HttpParams()
      .append('page', page.toString());

    return this._http
      .get<Photo[]>(`${this._api}/${username}/photos`, { params });
  }
}
