import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

  @Input() brightness = '70%';

  constructor(
    private el: ElementRef,
    private render: Renderer
  ) { }

  @HostListener('mouseover')
  darkenOn() {
    /**
     * o elemento não será manipulado diretamente, pois se o código for executado no servidor
     * o código não vai funcionar, por isso vamos manipular o elemento atraves do render.setElement
     */
    // this.el.nativeElement
    this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
  }

  @HostListener('mouseleave')
  darkenOff() {
    this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
  }
}
