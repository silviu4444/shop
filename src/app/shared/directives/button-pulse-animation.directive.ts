import {
  animate,
  AnimationBuilder,
  AnimationMetadata,
  AnimationPlayer,
  style
} from '@angular/animations';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appButtonPulseAnimation]'
})
export class ButtonPulseAnimationDirective {
  player: AnimationPlayer;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private builder: AnimationBuilder
  ) {}

  @Input('appButtonPulseAnimation') set show(shouldChange: boolean) {
    if (!shouldChange) {
      return;
    } else {
      this.changeButtonStyle('add_shopping_cart', 'removeClass', 'Add to Cart');
    }
  }

  @HostListener('click') onClick() {
    if (this.player) {
      this.player.destroy();
    }
    this.changeButtonStyle('done', 'addClass', 'Added');
    const metadata = this.pulse();
    const factory = this.builder.build(metadata);
    this.player = factory.create(this.element.nativeElement.children[0]);
    this.player.play();
  }

  private changeButtonStyle(
    iconType: string,
    classAction: string,
    buttonText: string
  ) {
    const matIcon = this.renderer.createElement('mat-icon');
    this.renderer.appendChild(matIcon, this.renderer.createText(`${iconType}`));
    this.renderer.addClass(matIcon, 'mat-icon');
    this.renderer.addClass(matIcon, 'material-icons');
    this.renderer[classAction](
      this.element.nativeElement,
      'changed-background'
    );
    this.renderer.setProperty(
      this.element.nativeElement,
      'innerHTML',
      `${buttonText}`
    );
    this.renderer.appendChild(this.element.nativeElement, matIcon);
  }

  private pulse(): AnimationMetadata[] {
    return [
      animate('150ms', style({ transform: 'scale(1.7)' })),
      animate('50ms', style({ transform: 'scale(1.5)' })),
      animate('50ms', style({ transform: 'scale(1.3)' })),
      animate('50ms', style({ transform: 'scale(1.2)' })),
      animate('50ms', style({ transform: 'scale(1.1)' })),
      animate('50ms', style({ transform: 'scale(1.2)' })),
      animate('50ms', style({ transform: 'scale(1.3)' })),
      animate('50ms', style({ transform: 'scale(1.4)' })),
      animate('50ms', style({ transform: 'scale(1.3)' })),
      animate('50ms', style({ transform: 'scale(1.2)' })),
      animate('50ms', style({ transform: 'scale(1.1)' })),
      animate('150ms', style({ transform: 'scale(1)' })),
      animate('150ms', style({ transform: 'scale(1.3)' })),
      animate('50ms', style({ transform: 'scale(1.5)' }))
    ];
  }
}
