import { Directive, Input, OnInit, ElementRef, Renderer } from "@angular/core";

import { Photo } from "../../photo";
import { UserService } from "../../../core/user/user.service";

@Directive({
  selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

  @Input() ownedPhoto: Photo;

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this._userService
      .getUser()
      .subscribe(user => {
        if (!user || user.id != this.ownedPhoto.userId) {
          this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
        }
      });
  }
}
