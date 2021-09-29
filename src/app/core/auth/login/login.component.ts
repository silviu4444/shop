import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthResponseData } from '../interfaces/interfaces';
import * as errorResponses from '../authResponseErrors';
import { CustomSnackbarService } from 'src/app/shared/services/CustomSnackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private customSnackBar: CustomSnackbarService,
    private router: Router
  ) {}

  isLoading = false;

  onSubmit({ form }: NgForm) {
    if (!form.valid) return;
    const email = form.controls.email.value;
    const password = form.controls.password.value;
    let auth$: Observable<AuthResponseData> = this.authService.login$(
      email,
      password
    );
    this.isLoading = true;
    auth$.subscribe(
      (responseData: AuthResponseData) => {
        this.isLoading = false;
        this.customSnackBar.open('Logged in succesfully!', 'Close', 3000);
        this.router.navigate(['/home']);
      },
      (errorResponse: string) => {
        this.isLoading = false;
        this.handleLoginErrors(errorResponse, form);
      }
    );
  }

  handleLoginErrors(error: string, form: FormGroup) {
    const errorCases = {
      [errorResponses.EMAIL_ERROR]: function () {
        form.get('email').setErrors({ emailNotExist: true });
      },
      [errorResponses.PASSWORD_ERROR]: function () {
        form.get('password').setErrors({ pwIncorrect: true });
      },
      [errorResponses.DEFAULT_ERROR]: () => {
        this.customSnackBar.open(
          'An unknown error ocurred. Try again later',
          null,
          3000
        );
      }
    };
    errorCases[error]
      ? errorCases[error]()
      : errorCases[errorResponses.DEFAULT_ERROR]();
  }
}
