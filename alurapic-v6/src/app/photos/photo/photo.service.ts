import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { Photo } from "./photo";
import { Helper } from '../../core/helper/helper';

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(
    private _http: HttpClient
  ) { }

  listFromUser(userName: string) {
    return this._http
      .get<Photo[]>(`${Helper.api}/${userName}/photos`);
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams()
      .append('page', page.toString());

    return this._http
      .get<Photo[]>(`${Helper.api}/${userName}/photos`, { params });
  }
}
