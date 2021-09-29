import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

let mockMatDrawerToggleFn = {
  toggle: () => true
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let matDrawer: MatDrawer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: MatDrawer, useValue: mockMatDrawerToggleFn }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    matDrawer = TestBed.inject(MatDrawer);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call authSerive.autoLogin on ngOnInit', () => {
    const spyOnAutoLogin = spyOn(component['authService'], 'autoLogin');
    component.ngOnInit();
    expect(spyOnAutoLogin).toHaveBeenCalled();
  });

  it('should call authService.logout', () => {
    const spyOnAuthLogout = spyOn<any>(component['authService'], 'logout');
    component.logout(matDrawer);
    expect(spyOnAuthLogout).toHaveBeenCalled();
  })

  it('should call mat toggle function', () => {
    const spyOnToggle = spyOn(matDrawer, 'toggle');
    component.logout(matDrawer)
    expect(spyOnToggle).toHaveBeenCalled();
  });
});
