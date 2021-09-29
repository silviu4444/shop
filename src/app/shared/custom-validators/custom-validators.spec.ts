import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  let formGroup = new FormGroup({});

  beforeEach(() => {
    formGroup = new FormGroup({
      passwords: new FormGroup(
        {
          password: new FormControl('1234'),
          confirmPassword: new FormControl('12346')
        },
        { validators: CustomValidators.passwordMatch }
      )
    });
  });

  it('expect passwords to match', () => {
    const formGroupMock = new FormGroup({
      passwords: new FormGroup({
        password: new FormControl('1234'),
        confirmPassword: new FormControl('1234')
      })
    });

    const confirmPasswordControl = formGroupMock.controls['passwords'];
    expect(CustomValidators.passwordMatch(confirmPasswordControl)).toEqual(
      null
    );
  });

  it('expect passwords to not match', () => {
    const formGroupMock = new FormGroup({
      passwords: new FormGroup({
        password: new FormControl('1234'),
        confirmPassword: new FormControl('12345')
      })
    });

    const confirmPasswordControl = formGroupMock.controls['passwords'];
    expect(CustomValidators.passwordMatch(confirmPasswordControl)).toEqual({
      notSame: true
    });
  });
});
