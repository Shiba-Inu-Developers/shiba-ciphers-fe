import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      // Handle empty control as invalid
      return null;
    }

    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  };
}
