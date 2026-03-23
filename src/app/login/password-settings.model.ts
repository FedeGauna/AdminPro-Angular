
/**
 * Represents the settings for password input display.
 */
export interface PasswordSettings {
    /** The input type for the password field (e.g., 'password', 'text'). */
    inputType: string;
    /** CSS classes for the password visibility toggle icon. */
    iconClass: { [key: string]: boolean };
}