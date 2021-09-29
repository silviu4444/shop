import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordMatch: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const isMach =
      password!.value === confirmPassword!.value &&
      !confirmPassword!.hasError('required')
        ? null
        : { ...confirmPassword!.errors, notSame: true };
    confirmPassword!.setErrors(isMach);
    return password!.value === confirmPassword!.value
      ? null
      : { notSame: true };
  };
}
