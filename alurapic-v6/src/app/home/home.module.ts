import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';

import { SigninComponent } from './signin/signin.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VMessageModule,
  ],
  declarations: [
    SigninComponent
  ]
})
export class HomeModule { }
