import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import * as Stacktrace from 'stacktrace-js';

import { UserService } from '../../core/user/user.service';
import { ServerLogService } from './server-log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector
  ) { }

  handleError(error: any): void {
    // console.log('se liga no erro cuzao!');
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const message = `Error: ${error.message ? error.message : (error || '').toString()}`;

    const userService = this.injector.get(UserService);
    const serverLogService = this.injector.get(ServerLogService);
    const router = this.injector.get(Router)

    if (environment.production) {
      router.navigate(['/error']);
    }

    Stacktrace
      .fromError(error)
      .then(stackFrames => {
        const stack = stackFrames
          .map(sf => (sf || '').toString())
          .join('\n');

        // console.error(error);
        // console.log(message);
        // console.log(stack);

        const logError = {
          message,
          url,
          stack,
          userName: userService.getUserName()
        };

        serverLogService
          .log(logError)
          .subscribe(
            () => console.log('Error logged on server'),
            err => {
              console.error(err);
              console.log('Fail to send log to server');
              console.error(logError);
            }
          );
      });
  }

}
