import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsRaitingComponent } from './stars-raiting.component';

describe('StarsRaitingComponent', () => {
  let component: StarsRaitingComponent;
  let fixture: ComponentFixture<StarsRaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsRaitingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsRaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
