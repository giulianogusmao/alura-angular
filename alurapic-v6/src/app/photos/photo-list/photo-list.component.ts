import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
})
export class PhotoListComponent implements OnInit {
  public photos = [];

  constructor(
    private _photoService: PhotoService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const user = this._activatedRoute.snapshot.params.username;

    this._photoService
      .listFromUser(user)
      .subscribe(
        photos => this.photos = photos,
        console.error
      );
  }
}
