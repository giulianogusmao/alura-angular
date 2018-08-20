import { NgModule } from "@angular/core";

import { PhotoDetailsComponent } from "./photo-details.component";
import { PhotoModule } from "../photo/photo.module";

@NgModule({
  imports: [
    PhotoModule
  ],
  declarations: [
    PhotoDetailsComponent
  ],
  exports: [
    PhotoDetailsComponent
  ],
})
export class PhotoDetailsModule { }
