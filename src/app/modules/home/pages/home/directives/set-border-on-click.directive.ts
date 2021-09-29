import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetBorderOnClick]'
})
export class SetBorderOnClickDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  previousIndex: number;

  @Input('appSetBorderOnClick') set border(index: number) {
    const nativeEl = this.element.nativeElement;
    const actualItem = nativeEl.children[index];
    nativeEl.children.length > 0 &&
      this.renderer.addClass(actualItem, 'custom-border');
    if (this.previousIndex || this.previousIndex === 0) {
      const previousItemSelected = nativeEl.children[this.previousIndex];
      this.renderer.removeClass(previousItemSelected, 'custom-border');
    }
    this.previousIndex = index;
  }
}
