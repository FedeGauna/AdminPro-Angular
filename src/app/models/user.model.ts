/**
 * Model representing a user in the application.
 * Contains user-related properties such as name, email, and role.
 */
export class User {
  /**
   * The name of the user.
   */
  public name: string;

  /**
   * The email address of the user.
   */
  public email: string;

  /**
   * The password of the user (optional).
   */
  public password?: string;

  /**
   * The URL of the user's profile image (optional).
   */
  public img?: string;

  /**
   * Indicates if the user is authenticated via Google (optional).
   */
  public google?: string;

  /**
   * The role assigned to the user (optional).
   */
  public role?: string;

  /**
   * The unique identifier of the user (optional).
   */
  public id?: string;
}