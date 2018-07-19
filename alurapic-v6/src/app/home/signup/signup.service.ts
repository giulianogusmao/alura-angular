import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Helper } from '../../core/helper/helper';

@Injectable({
  providedIn: 'root'
})
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
}
