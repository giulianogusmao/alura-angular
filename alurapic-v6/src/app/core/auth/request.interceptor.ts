import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../token/token.service';

@Injectable({ providedIn: 'root' })
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private _tokenService: TokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    if (this._tokenService.hasToken()) {
      req = req.clone({
        setHeaders: {
          'x-access-token': this._tokenService.token
        }
      });
    }

    return next.handle(req);
  }
}
