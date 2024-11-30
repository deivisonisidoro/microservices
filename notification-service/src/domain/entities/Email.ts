/**
 * Represents an email entity containing recipient, subject, and body.
 *
 * This class encapsulates the essential components of an email, including
 * recipient address, subject line, and email body.
 */
export class EmailEntity {
  /**
   * The recipient email address.
   */
  to: string;

  /**
   * The subject line of the email.
   */
  subject: string;

  /**
   * The body content of the email.
   */
  body: string;

  /**
   * Constructs a new EmailEntity instance.
   *
   * @param to - The recipient email address.
   * @param subject - The subject line of the email.
   * @param body - The body content of the email.
   */
  constructor(to: string, subject: string, body: string) {
    this.to = to;
    this.subject = subject;
    this.body = body;
  }
}
