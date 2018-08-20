import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { Notify, NotifyType } from "./notify";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  notifySubject: Subject<Notify> = new Subject<Notify>();

  success(message: string): void {
    this._notify(NotifyType.SUCCESS, message);
  }

  warning(message: string): void {
    this._notify(NotifyType.WARNING, message);
  }

  danger(message: string): void {
    this._notify(NotifyType.DANGER, message);
  }

  info(message: string): void {
    this._notify(NotifyType.INFO, message);
  }

  private _notify(notifyType: NotifyType, message: string): void {
    this.notifySubject.next(new Notify(notifyType, message));
  }

  getNotify(): Observable<Notify> {
    return this.notifySubject.asObservable();
  }

}
