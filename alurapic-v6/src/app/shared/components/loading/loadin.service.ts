import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { startWith } from "rxjs/operators";

import { LoadingType } from "./loading-type";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loadingSubject = new Subject<LoadingType>();

  getLoading(): Observable<LoadingType> {
    return this._loadingSubject
      .asObservable()
      .pipe(startWith(LoadingType.STOPPED)); // determina que o valor inicial seja stopped
  }

  start(): void {
    this._loadingSubject.next(LoadingType.LOADING);
  }

  stop(): void {
    this._loadingSubject.next(LoadingType.STOPPED);
  }
}
