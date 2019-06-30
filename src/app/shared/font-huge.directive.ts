import { Directive, HostListener, ElementRef, Self, Host } from '@angular/core';

@Directive({
  selector: '.ql-size-huge'
})
export class FontHugeDirective {

  constructor(@Host() @Self() private el: ElementRef) { }


  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'black';
    this.el.nativeElement.style.color = 'white';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = null;
    this.el.nativeElement.style.color = null;
  }

}
