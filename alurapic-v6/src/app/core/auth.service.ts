import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Helper } from './helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  authenticate(userName: string, password: string) {
    return this._http.post(`${Helper.api}/user/login`, { userName, password });
  }
}
