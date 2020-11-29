import { AbstractControl, ValidationErrors } from '@angular/forms';

export function imageUrlValidator(c: AbstractControl): ValidationErrors | null {
  const url: string = c.value;

  if (
    (url.startsWith('https://') ||
      url.startsWith('http://'))) {
    return null;
  } else {
    return { imageUrl: true };
  }
}