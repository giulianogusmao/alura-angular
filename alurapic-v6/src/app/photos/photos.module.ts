import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PhotoService } from './photo/photo.service';
import { PhotoComponent } from './photo/photo.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';

@NgModule({
  declarations: [
    PhotoComponent,
    PhotoListComponent,
    PhotoListComponent,
    PhotoFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    PhotoListComponent,
  ],
  providers: [
    PhotoService
  ]
})
export class PhotosModule { }
