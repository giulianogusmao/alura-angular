import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { ValertModule } from '../shared/components/valert/valert.module';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VMessageModule,
    ValertModule,
    RouterModule,
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
  ]
})
export class HomeModule { }
