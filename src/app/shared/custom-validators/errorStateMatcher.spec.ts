import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { errorStateMatcher } from './errorStateMatcher';

describe('errorStateMatcher', () => {
  const myErrorStateMatcher: errorStateMatcher = new errorStateMatcher();
  let group: FormGroup;
  let control: FormControl;
  let formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
  beforeEach(() => {
    group = new FormGroup({
      email: new FormControl('test@test.com', Validators.required)
    });
    control = group.controls['email'] as FormControl;
    formGroupDirective.form = group;
  });

  it('it should return false if no control', () => {
    expect(
      myErrorStateMatcher.isErrorState(null, formGroupDirective)
    ).toBeFalsy();
  });

  it('it should return false if control and control is invalid', () => {
    group.get('email').setValue('');
    expect(
      myErrorStateMatcher.isErrorState(control, formGroupDirective)
    ).toBeFalsy();
  });

  it('it should return false if control, control invalid are true but control.dirty is false', () => {
    group.get('email').setValue('');
    expect(
      myErrorStateMatcher.isErrorState(control, formGroupDirective)
    ).toBeFalsy();
  });

  it('it should return false if control, control.invalid are true but control.touched is false', () => {
    group.get('email').setValue('');
    expect(
      myErrorStateMatcher.isErrorState(control, formGroupDirective)
    ).toBeFalsy();
  });

  it('it should return true if the conditition is true up to control.dirty', () => {
    group.get('email').setValue('');
    control.markAsDirty();
    expect(
      myErrorStateMatcher.isErrorState(control, formGroupDirective)
    ).toBeTruthy();
  });

  it('it should return true if condition is true up to control.touched(excluding control.dirty)', () => {
    group.get('email').setValue('');
    control.markAsTouched();
    expect(
      myErrorStateMatcher.isErrorState(control, formGroupDirective)
    ).toBeTruthy();
  });
});
