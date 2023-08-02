import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function passwordValidator(password1: string, password2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass1 = control.get(password1)?.value;
    const pass2 = control.get(password2)?.value;
    const isValid = pass1 != '' || pass2 != '';

    if (!(pass1 === pass2)) {
      return { notEqual: { actual: password1, expected: password2 } };
    } else if (!isValid) {
      return { isRequired: { actual: password1, expected: password2 } };
    } else {
      return null;
    }
  };
}
