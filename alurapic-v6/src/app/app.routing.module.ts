import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'user/:userName',
    component: PhotoListComponent,
    resolve: {
      photos: PhotoListResolver
    },
    data: {
      title: 'Timeline'
    }
  },
  {
    path: 'photo/add',
    component: PhotoFormComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Upload photo'
    },
  },
  {
    path: 'photo/:photoId',
    component: PhotoDetailsComponent,
    data: {
      title: 'Photo Detail'
    },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Not found'
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Not found'
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { useHash: true }
    ),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
