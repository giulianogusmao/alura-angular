import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
})
export class PhotoListComponent implements OnInit, OnDestroy {
  photos = [];
  filter = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  username: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.username = this._activatedRoute.snapshot.params.username;
    this.photos = this._activatedRoute.snapshot.data['photos'];

    this.debounce
      .pipe(debounceTime(500))
      .subscribe(value => this.filter = value);
  }

  load() {
    this._photoService
      .listFromUserPaginated(this.username, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (photos.length < 12) this.hasMore = false;
      });
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
