import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingService } from './loadin.service';
import { LoadingType } from './loading-type';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<string>;

  constructor(
    private _loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.loading$ = this._loadingService
      .getLoading()
      .pipe(map(loadingType => loadingType.valueOf()));
  }

}
