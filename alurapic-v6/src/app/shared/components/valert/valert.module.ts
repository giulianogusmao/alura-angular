import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValertComponent } from './valert.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ValertComponent,
  ],
  exports: [
    ValertComponent,
  ]
})
export class ValertModule { }
