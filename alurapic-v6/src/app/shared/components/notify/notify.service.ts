import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { Notify, NotifyType } from "./notify";
import { Router, NavigationStart } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private notifySubject: Subject<Notify> = new Subject<Notify>();

  // parametro que define se a notificação permanecerá ativa para a próxima navegação
  private keepAfterRouteChange: boolean = false;

  constructor(
    router: Router,
  ) {
    // a cada navegação verifica se a notificação deve continuar sendo exibida ou se deve ser removida
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clearNotify();
        }
      }
    });
  }

  success(message: string, keepAfterRouteChange: boolean = false): void {
    this._notify(NotifyType.SUCCESS, message, keepAfterRouteChange);
  }

  warning(message: string, keepAfterRouteChange: boolean = false): void {
    this._notify(NotifyType.WARNING, message, keepAfterRouteChange);
  }

  danger(message: string, keepAfterRouteChange: boolean = false): void {
    this._notify(NotifyType.DANGER, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange: boolean = false): void {
    this._notify(NotifyType.INFO, message, keepAfterRouteChange);
  }

  /**
   *
   * @param notifyType Tipo de mensagem - SUCCESS, INFO, DANGER OU WARNING
   * @param message Mensagem que será exibida
   * @param keepAfterRouteChange Mensagem deve continuar sendo exibida após mudança de rota?
   */
  private _notify(notifyType: NotifyType, message: string, keepAfterRouteChange: boolean): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.notifySubject.next(new Notify(notifyType, message));
  }

  getNotify(): Observable<Notify> {
    return this.notifySubject.asObservable();
  }

  clearNotify(): void {
    this.notifySubject.next(null);
  }

}
