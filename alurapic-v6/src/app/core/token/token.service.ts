import { Injectable } from '@angular/core';

const KEY = 'alurapic_authToken_L3j2U4o1kM08N1U';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  hasToken() {
    return !!this.token;
  }

  set token(token: string) {
    window.localStorage.setItem(KEY, token);
  }

  get token() {
    return window.localStorage.getItem(KEY);
  }

  remove() {
    window.localStorage.removeItem(KEY);
  }
}
