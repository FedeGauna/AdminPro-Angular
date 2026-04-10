/**
 * Model representing a user in the application.
 */
export class User {
  /** User's full name. */
  public name: string;
  /** User's email address. */
  public email: string;
  /** User's password (optional). */
  public password?: string;
  /** User's profile image URL (optional). */
  public img?: string;
  /** Indicates if user registered via Google (optional). */
  public google?: string;
  /** User's role in the application (optional). */
  public role?: string;
  /** User's unique identifier (optional). */
  public id?: string;
}