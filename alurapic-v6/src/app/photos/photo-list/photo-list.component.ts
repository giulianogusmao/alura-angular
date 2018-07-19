import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
})
export class PhotoListComponent implements OnInit {
  photos = [];
  filter = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.userName = this._activatedRoute.snapshot.params.userName;
    this.photos = this._activatedRoute.snapshot.data['photos'];
  }

  load() {
    this._photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (photos.length < 12) this.hasMore = false;
      });
  }
}
