import nodemailer from 'nodemailer';

import { EmailEntity } from '../../domain/entities/Email';
import { EmailSenderInterface } from '../../domain/providers/EmailSender';
import { EnvironmentVariables } from '../config/EnvironmentVariables';

/**
 * Implementation of the EmailSenderInterface using Nodemailer.
 */
class EmailSender implements EmailSenderInterface {
  private transporter: nodemailer.Transporter;
  private env: EnvironmentVariables;

  /**
   * Constructs an instance of EmailSender.
   */
  constructor() {
    /**
     * Retrieves environment variables for mail configuration.
     */
    this.env = EnvironmentVariables.getInstance();

    /**
     * Creates a Nodemailer transporter using the configured mail settings.
     */
    this.transporter = nodemailer.createTransport({
      host: this.env.getMailHost(),
      port: this.env.getMailPort(),
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: this.env.getMailUser(),
        pass: this.env.getMailPassword(),
      },
    });
  }

  /**
   * Sends an email using Nodemailer.
   * @param {EmailEntity} email - The email entity containing the email details.
   * @returns {Promise<void>} A Promise that resolves when the email is sent successfully.
   */
  async send(email: EmailEntity): Promise<void> {
    /**
     * Constructs the mail options object with the email details.
     */
    const mailOptions = {
      from: this.env.getMailFrom(),
      to: email.to,
      subject: email.subject,
      html: email.body,
    };

    /**
     * Sends the email using the configured transporter.
     */
    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailSender;
