import {
  animate,
  AnimationBuilder,
  AnimationMetadata,
  AnimationPlayer,
  style
} from '@angular/animations';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appImageSrcAnimation]'
})
export class ImageSrcAnimationDirective {
  player: AnimationPlayer;
  previousIndex: number;

  constructor(private builder: AnimationBuilder, private element: ElementRef) {}

  @Input('appImageSrcAnimation') set show(index: number) {
    if (this.player) {
      this.player.destroy();
    }
    const metadata =
      index > this.previousIndex ? this.slideRight() : this.slideLeft();
    const factory = this.builder.build(metadata);
    this.player = factory.create(this.element.nativeElement);
    this.previousIndex && this.player.play();
    this.previousIndex = index;
  }

  private slideRight(): AnimationMetadata[] {
    return [
      style({ opacity: 0 }),
      animate('150ms', style({ transform: 'translateX(-20%)' })),
      style({ opacity: 1 }),
      animate('150ms', style({ transform: 'translateX(0%)' }))
    ];
  }

  private slideLeft(): AnimationMetadata[] {
    return [
      style({ opacity: 0 }),
      animate('150ms', style({ transform: 'translateX(+20%)' })),
      style({ opacity: 1 }),
      animate('150ms', style({ transform: 'translateX(0%)' }))
    ];
  }
}
