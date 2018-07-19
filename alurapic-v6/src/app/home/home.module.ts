import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { ValertModule } from '../shared/components/valert/valert.module';
import { HomeRoutingModule } from './home.routing.module';

import { HomeComponent } from './home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VMessageModule,
    ValertModule,
    RouterModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    SigninComponent,
    SignupComponent,
  ]
})
export class HomeModule { }
