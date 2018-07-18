import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Helper } from '../helper/helper';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { }

  authenticate(userName: string, password: string) {
    return this._http
      .post(`${Helper.api}/user/login`, { userName, password }, { observe: 'response'})
      .pipe(tap(res => {
        /**
         * para ter acesso aos headers da requisição, é necessário passar o parâmentro { observe: 'response'},
         * assim conseguimos pegar o token que foi retornado quando o component signin realizar o login
         */
        this._userService.setToken(res.headers.get('x-access-token'));
      }));
  }
}
