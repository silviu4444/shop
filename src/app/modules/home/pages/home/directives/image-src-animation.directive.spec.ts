import { animate, AnimationBuilder, style } from '@angular/animations';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImageSrcAnimationDirective } from './image-src-animation.directive';

const mockAnimationBuilder = {
  build: () => {
    return {
      create: () => {
        return {
          play: () => {},
          destroy: () => {}
        };
      }
    };
  }
};

const slideLeftResult = [
  style({ opacity: 0 }),
  animate('150ms', style({ transform: 'translateX(+20%)' })),
  style({ opacity: 1 }),
  animate('150ms', style({ transform: 'translateX(0%)' }))
];

const slideRightResult = [
  style({ opacity: 0 }),
  animate('150ms', style({ transform: 'translateX(-20%)' })),
  style({ opacity: 1 }),
  animate('150ms', style({ transform: 'translateX(0%)' }))
];

@Component({
  template: ` <div class="item-presentation-container">
    <div class="item-presentation">
      <img
        class="main-image"
        src="{{ colorSelected.imgURL }}"
        [appImageSrcAnimation]="colorSelected.index + 1"
      />
    </div>
  </div>`
})
class TestImageSrcChangeComponent {
  colorSelected: { colorName: string; imgURL: string; index: number } = {
    colorName: null,
    imgURL: null,
    index: null
  };

  @ViewChild(ImageSrcAnimationDirective) directive: ImageSrcAnimationDirective;
}

describe('ImageSrcAnimationDirective', () => {
  let component: TestImageSrcChangeComponent;
  let fixture: ComponentFixture<TestImageSrcChangeComponent>;
  let imageElement: DebugElement;
  let debugElement: DebugElement;
  let directive: ImageSrcAnimationDirective;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestImageSrcChangeComponent, ImageSrcAnimationDirective],
      providers: [{ provide: AnimationBuilder, useValue: mockAnimationBuilder }]
    }).compileComponents();

    fixture = TestBed.createComponent(TestImageSrcChangeComponent);
    component = fixture.componentInstance;
    imageElement =
      fixture.debugElement.nativeElement.querySelector('.main-image');
    debugElement = fixture.debugElement.query(
      By.directive(ImageSrcAnimationDirective)
    );
    directive = debugElement.injector.get(ImageSrcAnimationDirective);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('slide left & right should return an array of type AnimationMetadata', () => {
    const slideLeftFn = directive['slideLeft'];
    const slideRigthFn = directive['slideRight'];
    expect(slideLeftFn()).toEqual(slideLeftResult);
    expect(slideRigthFn()).toEqual(slideRightResult);
  });
});
