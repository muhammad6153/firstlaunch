import { Validators } from "@angular/forms";

export const NameValidator = [
  Validators.minLength(2),
  Validators.maxLength(32),
];

export const AgeValidator = [Validators.min(18), Validators.max(60)];
