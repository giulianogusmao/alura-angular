import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject, Observable } from 'rxjs';

import * as jwt_decode from 'jwt-decode';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userObs = new BehaviorSubject<User>(null);
  userName: string;

  constructor(
    private _tokenService: TokenService
  ) {
    // Quando a aplicação for iniciada, verifica se existe um token para carregar usuário
    this._tokenService.hasToken() &&
      this.decodeAndNotify();
  }

  setToken(token: string): void {
    this._tokenService.token = token;
    this.decodeAndNotify();
  }

  getUser(): Observable<User> {
    return this.userObs.asObservable();
  }

  decodeAndNotify(): void {
    const token = this._tokenService.token;
    const user = jwt_decode(token) as User;
    this.userName = user.name;
    this.userObs.next(user);
  }

  logout() {
    this._tokenService.remove();
    this.userObs.next(null);
  }

  isLogged() {
    return this._tokenService.hasToken();
  }

  getUserName(): string {
    return this.userName;
  }
}
