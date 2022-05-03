import { AbstractControl, ValidationErrors } from '@angular/forms';

export class RegistrationValidators {
    static confirmPass(control: AbstractControl): ValidationErrors | null {
        const pass = control.value.password;
        const cPass = control.value.confirmPassword;
        if (pass && cPass && pass !== cPass) {
            return { mismatch: true };
        }
        return null;
    }
}
