import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class CustomSnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  public open(message: string, action?: string , duration?: number) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration
    })
  }
}
