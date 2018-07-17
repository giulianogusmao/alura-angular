import { NgModule } from '@angular/core';
import { CommonModule } from '../../../../node_modules/@angular/common';

import { PhotoModule } from '../photo/photo.module';
import { CardModule } from '../../shared/components/card/card.module';

import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDescription } from './filter-by-description.pipe';

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotosComponent,
    LoadButtonComponent,
    FilterByDescription,
  ],
  imports: [
    CommonModule,
    PhotoModule,
    CardModule
  ],
})
export class PhotoListModule { }
