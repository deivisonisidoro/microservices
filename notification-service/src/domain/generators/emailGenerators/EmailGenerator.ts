import { EmailEntity } from '../../entities/Email';

/**
 * Interface representing a contract for generating email entities.
 *
 * This interface defines a method to generate an email entity, typically used
 * for creating welcome emails for new users.
 */
export interface EmailGeneratorInterface {
  /**
   * Generates a welcome email entity for the specified user.
   *
   * @param username - The username of the user.
   * @param email - The email address of the user.
   * @returns An EmailEntity representing the generated welcome email.
   */
  execute(username: string, email: string): EmailEntity;
}
