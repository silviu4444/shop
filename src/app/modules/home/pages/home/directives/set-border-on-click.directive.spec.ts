import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetBorderOnClickDirective } from './set-border-on-click.directive';

@Component({
  template: ` <div
    class="item-colors"
    [appSetBorderOnClick]="colorsAvailableIndex"
  >
    <div
      class="item-color"
      (click)="onChangeColor(i)"
      *ngFor="let color of item.specs.colors | keyvalue; let i = index"
    >
      <img src="{{ color.value }}" alt="" />
      <span>{{ color.key }}</span>
    </div>
  </div>`
})
class TestBorderOnClickComponent {
  item = {
    specs: {
      colors: {
        Black: ['test'],
        White: ['test2']
      }
    }
  };

  colorsAvailableIndex: number;

  onChangeColor(index: number) {
    this.colorsAvailableIndex = index;
  }
}

describe('ImageSrcAnimationDirective', () => {
  let component: TestBorderOnClickComponent;
  let fixture: ComponentFixture<TestBorderOnClickComponent>;
  let colorsItem;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestBorderOnClickComponent, SetBorderOnClickDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestBorderOnClickComponent);
    component = fixture.componentInstance;
    colorsItem =
      fixture.debugElement.nativeElement.querySelector('.item-colors');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render al least one image', () => {
    fixture.detectChanges();
    expect(colorsItem.children.length).toBeGreaterThan(0);
  });

  it("should add 'custom-border' to the item that was clicked", () => {
    fixture.detectChanges();
    const firstImage = colorsItem.children[0];
    firstImage.click();
    fixture.detectChanges();
    expect(firstImage.classList.contains('custom-border')).toBeTruthy();
  });

  it("should remove 'custom-border' to previous item that was clicked", () => {
    fixture.detectChanges();
    const previousItem = colorsItem.children[0];
    previousItem.click();
    fixture.detectChanges();
    expect(previousItem.classList.contains('custom-border')).toBeTruthy();
    const secondImage = colorsItem.children[1];
    secondImage.click();
    fixture.detectChanges();
    expect(previousItem.classList.contains('custom-border')).toBeFalsy();
    expect(secondImage.classList.contains('custom-border')).toBeTruthy();
  });
});
