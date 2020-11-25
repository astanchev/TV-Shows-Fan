import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatch(c: AbstractControl): ValidationErrors | null {
  return c.value.password === c.value.rePassword ? null : { passwordMatch: true };
}
