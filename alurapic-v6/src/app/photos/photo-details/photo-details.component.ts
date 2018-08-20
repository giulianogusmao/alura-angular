import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { PhotoService } from "../photo/photo.service";
import { Photo, PhotoCommment } from "../photo";

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: string;

  constructor(
    private _route: ActivatedRoute,
    private _photoService: PhotoService,
  ) { }

  ngOnInit(): void {
    this.photoId = this._route.snapshot.params.photoId;
    this.photo$ = this._photoService.findById(this.photoId);
  }
}
