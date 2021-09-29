import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthResponseData } from './interfaces/interfaces';
import { User } from './user.model';
import * as errorResponses from './authResponseErrors';
import { CustomSnackbarService } from 'src/app/shared/services/CustomSnackbar.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private customSnackBarService: CustomSnackbarService
  ) {}

  signup$(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        environment.registerUrl + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap((responseData: AuthResponseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  login$(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        environment.loginUrl + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap((responseData: AuthResponseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user$.next(loadedUser);
      const expirationDate =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDate);
    }
  }

  logout() {
    this.user$.next(null);
    localStorage.removeItem('userData');
    this.customSnackBarService.open('You have been logged out.', 'Close');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocurred';
    const notAnErrorFromBE = !errorResponse.error || !errorResponse.error.error;
    if (notAnErrorFromBE) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = errorResponses.EMAIL_EXISTS;
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = errorResponses.EMAIL_ERROR;
        break;
      case 'INVALID_PASSWORD':
        errorMessage = errorResponses.PASSWORD_ERROR;
    }

    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user$.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
