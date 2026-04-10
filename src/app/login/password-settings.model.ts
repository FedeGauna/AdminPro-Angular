/**
 * Interface for password input display settings.
 */
export interface PasswordSettings {
    /** HTML input type for password field. */
    inputType: string;
    /** Font Awesome icon classes for password visibility toggle. */
    iconClass: { [key: string]: boolean };
}