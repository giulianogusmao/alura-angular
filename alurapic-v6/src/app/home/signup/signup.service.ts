import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Helper } from '../../core/helper/helper';
import { NewUser } from './newUser';

@Injectable()
export class SignupService {

  constructor(
    private _http: HttpClient
  ) {}

  /**
   * Método que verifica se o username já está sendo utilizado
   *
   * @param {string} userName
   */
  checkUserNameTaken(userName: string) {
    return this._http.get(`${Helper.api}/user/exists/${userName}`)
  }

  signup(newUser: NewUser) {
    return this._http
      .post(`${Helper.api}/user/signup`, newUser);
  }
}
