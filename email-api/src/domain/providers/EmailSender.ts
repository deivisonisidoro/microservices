import { EmailEntity } from '../entities/Email';

/**
 * Interface representing a contract for sending email entities.
 *
 * This interface defines a method to send an email entity.
 */
export interface EmailSenderInterface {
  /**
   * Sends the specified email entity.
   *
   * @param emailEntity - The email entity to be sent.
   * @returns A Promise that resolves when the email is sent successfully, or rejects with an error.
   */
  send(emailEntity: EmailEntity): Promise<void>;
}
