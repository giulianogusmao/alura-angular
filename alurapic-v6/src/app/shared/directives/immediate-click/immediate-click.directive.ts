import { Directive, ElementRef, OnInit } from "@angular/core";
import { PlatformDetectorService } from "../../../core/platform-detector/platform-detector.service";

@Directive({
  selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

  constructor(
    private element: ElementRef<any>,
    private _platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit(): void {
    // blinda verificando se o elemento está sendo acessado no browser
    this._platformDetectorService.isPlatformBrowser && this.element.nativeElement.click();
  }
}
