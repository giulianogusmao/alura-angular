import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
})
export class PhotoListComponent implements OnInit {
  public photos = [];

  constructor(
    private _photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this._photoService
      .listFromUser('flavio')
      .subscribe(
        photos => this.photos = photos,
        console.error
      );
  }
}
