import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    console.log('se liga no erro cuzao!');
    throw error;
  }

}
