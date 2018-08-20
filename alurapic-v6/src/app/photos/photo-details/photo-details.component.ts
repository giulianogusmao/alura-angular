import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { PhotoService } from "../photo/photo.service";
import { Photo } from "../photo/photo";

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo: Photo;

  constructor(
    private _route: ActivatedRoute,
    private _photoService: PhotoService,
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.params.photoId;

    this._photoService
      .findById(id)
      .subscribe(photo => this.photo = photo);
  }
}
