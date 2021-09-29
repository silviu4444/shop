import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomValidators } from 'src/app/shared/custom-validators/custom-validators';
import { errorStateMatcher } from 'src/app/shared/custom-validators/errorStateMatcher';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthResponseData } from '../interfaces/interfaces';
import { CustomSnackbarService } from 'src/app/shared/services/CustomSnackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private customSnackBarService: CustomSnackbarService
  ) {}

  signupForm = new FormGroup({});
  matcher = new errorStateMatcher();
  isLoading = false;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      passwords: new FormGroup(
        {
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(8)
          ]),
          confirmPassword: new FormControl(null, [Validators.required])
        },
        { validators: CustomValidators.passwordMatch }
      )
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) return;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.passwords.password;
    this.isLoading = true;
    let auth$: Observable<AuthResponseData> = this.authService.signup$(
      email,
      password
    );
    auth$.subscribe(
      (responseData) => {
        this.isLoading = false;
        this.customSnackBarService.open(
          'Your account has been created!',
          'Close',
          3000
        );
        this.router.navigate(['/home']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.signupForm.get('email').setErrors({ emailExist: true });
      }
    );
  }
}
