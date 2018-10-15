import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ServerLog } from "./server-log";
import { Helper } from "../../core/helper/helper";

@Injectable({
  providedIn: 'root'
})
export class ServerLogService {

  constructor(
    private _http: HttpClient
  ) { }

  log(serverLog: ServerLog) {
    return this._http.post(`${Helper.apiLog}/infra/log`, serverLog);
  }
}
