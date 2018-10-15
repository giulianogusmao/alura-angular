import { environment } from '../../../environments/environment';

export class Helper {

  constructor() {
    throw new Error('Class Helper não deve ser instanciada!');
  }

  static get api() {
    return environment.ApiUrl;
  }

  static get apiLog() {
    return environment.ServerLog;
  }
}
