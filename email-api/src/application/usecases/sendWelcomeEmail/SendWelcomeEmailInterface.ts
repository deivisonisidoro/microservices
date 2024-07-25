/**
 * Interface representing a use case for sending welcome emails to users.
 *
 * This interface defines a method to execute the use case of sending a welcome email
 * to a user, taking their username and email address as parameters.
 *
 * @remarks
 * Implementing classes or functions should adhere to this interface, providing
 * functionality to generate and send welcome emails to users.
 */
export interface SendWelcomeEmailUseCaseInterface {
  /**
   * Executes the use case to send a welcome email to the specified user.
   *
   * @param username - The username of the user receiving the welcome email.
   * @param email - The email address of the user.
   * @returns A Promise that resolves when the email is successfully sent, or rejects with an error.
   *
   * @throws Throws an error if there is a failure while sending the email.
   */
  execute(username: string, email: string): Promise<void>;
}
