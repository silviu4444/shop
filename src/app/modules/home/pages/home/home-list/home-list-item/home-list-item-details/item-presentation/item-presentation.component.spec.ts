import { AnimationBuilder } from '@angular/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageSrcAnimationDirective } from '../../../../directives/image-src-animation.directive';
import { SetBorderOnClickDirective } from '../../../../directives/set-border-on-click.directive';

import { ItemPresentationComponent } from './item-presentation.component';

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

fdescribe('ItemPresentationComponent', () => {
  let component: ItemPresentationComponent;
  let fixture: ComponentFixture<ItemPresentationComponent>;

  let image: HTMLImageElement;
  let imageIcons: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ItemPresentationComponent,
        SetBorderOnClickDirective,
        ImageSrcAnimationDirective
      ],
      providers: [
        { provide: AnimationBuilder, useValue: mockAnimationBuilder }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPresentationComponent);
    component = fixture.componentInstance;
    component.color = 'red';
    component.images = {
      red: ['red', 'red2', 'red3'],
      blue: ['blue', 'blue2', 'blue3']
    };
    fixture.detectChanges();

    image = fixture.debugElement.nativeElement.querySelector('.main-image');
    imageIcons =
      fixture.debugElement.nativeElement.querySelector('.custom-slider');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('main image presensation should have src set as "red" by default', () => {
    fixture.detectChanges();
    expect(image.src).toContain('red');
  });

  it('main image should have src set as "red3" and the third slider image should have class "custom-border"', () => {
    component.changeImage(2);
    fixture.detectChanges();
    expect(image.src).toContain('red3');
    const indexedSliderImage =
      imageIcons.children[component.colorSelected.index];
    expect(indexedSliderImage.classList.contains('custom-border')).toBeTruthy();
  });

  it("it should call ngOnChanges if a component's property has changed", () => {
    const spyOnNgOnChanges = spyOn(component, 'ngOnChanges');
    fixture.detectChanges();
    component.colorSelected.colorName = 'Red';
    fixture.detectChanges();
    expect(spyOnNgOnChanges).toHaveBeenCalled();
  });
});
