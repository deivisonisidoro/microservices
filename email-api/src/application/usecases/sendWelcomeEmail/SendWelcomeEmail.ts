import { EmailGeneratorInterface } from '../../../domain/generators/emailGenerators/EmailGenerator';
import { EmailSenderInterface } from '../../../domain/providers/EmailSender';
import { SendWelcomeEmailUseCaseInterface } from './SendWelcomeEmailInterface';

/**
 * Represents a use case for sending welcome emails to users.
 *
 * This class implements the SendWelcomeEmailUseCaseInterface, providing functionality
 * to generate and send welcome emails to users.
 *
 * @remarks
 * This class encapsulates the logic for generating and sending welcome emails to new users.
 * It relies on instances of EmailSenderInterface and WelcomeEmailGeneratorInterface for sending
 * and generating emails, respectively.
 */
export class SendWelcomeEmailUseCase
  implements SendWelcomeEmailUseCaseInterface
{
  private emailSender: EmailSenderInterface;
  private emailGenerator: EmailGeneratorInterface;

  /**
   * Constructs a new SendWelcomeEmailUseCase instance.
   *
   * @param emailSender - An instance implementing the EmailSenderInterface for sending emails.
   * @param emailGenerator - An instance implementing the WelcomeEmailGeneratorInterface for generating emails.
   */
  constructor(
    emailSender: EmailSenderInterface,
    emailGenerator: EmailGeneratorInterface,
  ) {
    this.emailSender = emailSender;
    this.emailGenerator = emailGenerator;
  }

  /**
   * Executes the use case to send a welcome email to the specified user.
   *
   * @param username - The username of the user.
   * @param email - The email address of the user.
   * @returns A Promise that resolves when the email is sent successfully, or rejects with an error.
   */
  async execute(username: string, email: string): Promise<void> {
    const welcomeEmail = this.emailGenerator.execute(username, email);
    welcomeEmail.to = email;
    await this.emailSender.send(welcomeEmail);
  }
}
