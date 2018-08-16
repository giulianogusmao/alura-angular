import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';
import { PhotoModule } from '../photo/photo.module';

import { PhotoFormComponent } from './photo-form.component';

@NgModule({
  declarations: [
    PhotoFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    VMessageModule,
    PhotoModule
  ]
})
export class PhotoFormModule { }
