import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NotifyModule } from '../shared/components/notify/notify.module';
import { LoadingModule } from '../shared/components/loading';
import { MenuModule } from '../shared/components/menu';
import { ShowIfLoggedModule } from '../shared/directives/show-if-logged';

import { HeaderComponent } from './header/header/header.component';
import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NotifyModule,
    LoadingModule,
    MenuModule,
    ShowIfLoggedModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
