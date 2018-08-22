import { Injectable } from "@angular/core";
import { HttpRequest, HttpInterceptor, HttpHandler, HttpSentEvent, HttpUserEvent, HttpResponse, HttpProgressEvent, HttpHeaderResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { LoadingService } from "./loadin.service";

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private _loadingService: LoadingService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    return next
      .handle(req)
      .pipe(tap(event => {
        event instanceof HttpResponse
        ? this._loadingService.stop()
        : this._loadingService.start();
      }));
  }

}
