import { Component, Input } from '@angular/core';
import { Helper } from '../../core/helper/helper';

const PATH = Helper.api + '/imgs/';

@Component({
  selector: 'ap-photo',
  templateUrl: 'photo.component.html'
})
export class PhotoComponent {

  private _url: string;

  @Input() description = '';

  @Input() set url(url: string) {
    this._url = url.startsWith('data') ? url : PATH + url;
  }

  get url() {
    return this._url;
  }
}
