import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformDetectorService {

  constructor(
    @Inject(PLATFORM_ID) private _platform_id: string
  ) { }

  isPlatformBrowser() {
    return isPlatformBrowser(this._platform_id);
  }
}
