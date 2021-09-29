import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopSpecsTableComponent } from './laptop-specs-table.component';

describe('LaptopSpecsTableComponent', () => {
  let component: LaptopSpecsTableComponent;
  let fixture: ComponentFixture<LaptopSpecsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaptopSpecsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptopSpecsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
