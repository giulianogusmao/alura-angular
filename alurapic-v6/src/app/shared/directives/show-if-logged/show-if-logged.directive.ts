import { Directive, ElementRef, Renderer, OnInit } from "@angular/core";

import { UserService } from "../../../core/user/user.service";

@Directive({
  selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

  private currentDisplay: string;

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.refreshCurrentDisplay();

    this.userService.getUser().subscribe(user => {
      if (user) {
        this.renderer.setElementStyle(this.element.nativeElement, 'display', this.currentDisplay);
      } else {
        this.refreshCurrentDisplay();
        // esconde elemento caso o usuário não esteja logado
        this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
      }
    });

  }

  refreshCurrentDisplay() {
    // captura o display na inicialização do componente
    this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
  }
}
