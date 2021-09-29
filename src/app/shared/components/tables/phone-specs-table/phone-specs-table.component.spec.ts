import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneSpecsTableComponent } from './phone-specs-table.component';

describe('PhoneSpecsTableComponent', () => {
  let component: PhoneSpecsTableComponent;
  let fixture: ComponentFixture<PhoneSpecsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneSpecsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneSpecsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
