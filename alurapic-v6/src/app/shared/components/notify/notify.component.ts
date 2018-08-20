import { Component, OnInit, Input } from "@angular/core";
import { NotifyService } from "./notify.service";
import { Notify, NotifyType } from "./notify";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html'
})
export class NotifyComponent implements OnInit {

  @Input() timeout = 3000;
  alerts: Notify[] = [];

  constructor(
    private _notifyService: NotifyService,
  ) {}

  ngOnInit(): void {
    this._notifyService
      .getNotify()
      .subscribe(notify => {
        // se for disparado um alerta vazio, limpa todos os alertas
        if (!notify) {
          this.alerts = [];
          return;
        }

        this.alerts.push(notify);
        setTimeout(() => this.removeNotify(notify), this.timeout);
      });
  }

  removeNotify(notifyToRemove: Notify) {
    this.alerts = this.alerts.filter(notify => notify != notifyToRemove);
  }

  getNotifyClass(notify: Notify) {
    if (!notify) return '';

    switch (notify.notifyType) {

      case NotifyType.SUCCESS:
        return 'alert alert-success';

      case NotifyType.WARNING:
        return 'alert alert-warning';

      case NotifyType.DANGER:
        return 'alert alert-danger';

      case NotifyType.INFO:
        return 'alert alert-info';

      default:
        return 'alert';
    }
  }
}
