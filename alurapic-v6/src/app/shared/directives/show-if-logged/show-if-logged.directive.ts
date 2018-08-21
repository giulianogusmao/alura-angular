import { Directive, ElementRef, Renderer, OnInit } from "@angular/core";

import { UserService } from "../../../core/user/user.service";

@Directive({
  selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    // esconde elemento caso o usuário não esteja logado
    !this.userService.isLogged()
      && this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
  }
}
