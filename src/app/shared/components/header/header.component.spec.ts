import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDrawer } from '@angular/material/sidenav';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

import { HeaderComponent } from './header.component';

let authServiceMock = {
  user$: of('test')
};

let matDrawerMock = {
  toggle: () => true
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: MatDrawer, useValue: matDrawerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.matDrawerRef = TestBed.inject(MatDrawer);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute toggle function from mat drawer', () => {
    const matDrawerToggleFn = spyOn(component.matDrawerRef, 'toggle');
    component.onToggleSidebar();
    expect(matDrawerToggleFn).toHaveBeenCalled();
  });
});
