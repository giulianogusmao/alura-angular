import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

import { PhotoService } from "../photo/photo.service";
import { Photo, PhotoCommment } from "../photo";
import { NotifyService } from "../../shared/components/notify/notify.service";
import { UserService } from "../../core/user/user.service";

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _photoService: PhotoService,
    private _notifyService: NotifyService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.photoId = this._route.snapshot.params.photoId;
    this.photo$ = this._photoService.findById(this.photoId);

    // redireciona para not-found quando acessar uma foto que não existe
    this.photo$.subscribe(() => {}, err => this._router.navigate(['/not-found']));
  }

  remove(): void {
    this._photoService
      .removePhoto(this.photoId)
      .subscribe(() => {
        this._notifyService.success('Photo removed', true);
        this._router.navigate(['/user', this._userService.getUserName()], { replaceUrl: true });
      },
    err => {
      console.error(err);
      this._notifyService.danger('Could not delete the photo!');
    });
  }

  like(photo: Photo): void {
    this._photoService
      .like(photo.id)
      .subscribe(liked => {
        if (liked) {
          this.photo$ = this._photoService.findById(photo.id);
        } else {
          this._notifyService.warning('Sorry, dislike is disabled!');
        }
      }, err => {
        console.error(err);
      });
  }
}
