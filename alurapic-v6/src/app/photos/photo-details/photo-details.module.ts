import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { PhotoModule } from "../photo/photo.module";

import { PhotoDetailsComponent } from "./photo-details.component";
import { PhotoCommentComponent } from "./photo-comments/photo-comments.component";
import { VMessageModule } from "../../shared/components/vmessage/vmessage.module";
import { PhotoOwnerOnlyDirective } from "./photo-owner-only/photo-owner-only.directive";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PhotoModule,
    VMessageModule,
  ],
  declarations: [
    PhotoDetailsComponent,
    PhotoCommentComponent,
    PhotoOwnerOnlyDirective,
  ],
  exports: [
    PhotoDetailsComponent,
    PhotoCommentComponent,
  ],
})
export class PhotoDetailsModule { }
