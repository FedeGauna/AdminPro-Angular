import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passwordCustomValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const errors: ValidationErrors = {};
        
        if(!value){
            errors.required = "Password is required.";
            return errors;
        }

        if(!/[a-z]/.test(value)) {
            errors.lowercase = "Must contain at least one lowercase letter."
        }
        if(!/[A-Z]/.test(value)) {
            errors.uppercase = "Must contain at least one uppercase letter."
        }
        if(!/\d/.test(value)) {
            errors.number = "Must contain at least one number."
        }
        if(!/[!@#$%^&*()\-__+.]/.test(value)) {
            errors.lowercase = "Must contain at least one special character."
        }
        if(value.length < 8) {
            errors.length = "Must contain at least 8 characters."
        }

        return Object.keys(errors).length ? errors : null;
    };
}
