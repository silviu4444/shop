import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AngularMaterialModule } from 'src/app/material.module';
import { CustomSnackbarService } from 'src/app/shared/services/CustomSnackbar.service';
import { AuthService } from '../auth.service';

import { RegisterComponent } from './register.component';

const authServiceMock = {
  signup$: () => of(true)
};

const customSnackBarMock = {
  open: () => of(true)
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CustomSnackbarService, useValue: customSnackBarMock }
      ],
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        CommonModule,
        RouterTestingModule,
        AngularMaterialModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.signupForm.patchValue({
      email: 'test@test.com',
      passwords: {
        password: 'Test1234',
        confirmPassword: 'Test1234'
      }
    });
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not continue onSubmit execution if the form is not valid', () => {
    const spyOnSignup = spyOn(component['authService'], 'signup$');
    component.signupForm.patchValue({
      email: 'test',
      passwords: {
        password: 'Test1234',
        confirmPassword: 'Test1234'
      }
    });
    component.onSubmit();
    expect(spyOnSignup).not.toHaveBeenCalled();
  });

  it('should continue onSubmit execution if the form is valid(for success BE response)', () => {
    const spyOnOpenSnackBar = spyOn(component['customSnackBarService'], 'open');
    const spyOnRouter = spyOn(component['router'], 'navigate');
    component.onSubmit();
    component['authService'].signup$('test', 'test1234').subscribe(() => {
      expect(component.isLoading).toBeFalsy();
      expect(spyOnOpenSnackBar).toHaveBeenCalledWith(
        'Your account has been created!',
        'Close',
        3000
      );
      expect(spyOnRouter).toHaveBeenCalledWith(['/home']);
    });
  });

  it('onSubmit should continue the execution if the form is valid(for fail BE response)', () => {
    spyOn(component['authService'], 'signup$').and.returnValue(
      throwError(null)
    );
    component.onSubmit();
    component['authService'].signup$('test', 'test1234').subscribe(
      () => {},
      (errorResponse) => {
        expect(component.isLoading).toBeFalsy();
        expect(
          component.signupForm.get('email').errors['emailExist']
        ).toBeDefined();
      }
    );
  });
});
