import { SendWelcomeEmailUseCase } from '../../../application/usecases/sendWelcomeEmail/SendWelcomeEmail';
import { WelcomeEmailGenerator } from '../../generators/WelcomeEmailGenerator';
import EmailSender from '../../providers/EmailSender';

/**
 * Composes and sends a welcome email using the SendWelcomeEmailUseCase.
 * @param {any} jsonObject - The JSON object containing user data.
 * @returns {Promise<void>} A Promise that resolves when the email is sent successfully.
 */
async function sendWelcomeEmailComposer(jsonObject: any): Promise<void> {
  /**
   * Creates instances of EmailSender, WelcomeEmailGenerator, and SendWelcomeEmailUseCase.
   */
  const emailSender = new EmailSender();
  const emailGenerator = new WelcomeEmailGenerator();
  const sendWelcomeEmailUseCase = new SendWelcomeEmailUseCase(
    emailSender,
    emailGenerator,
  );

  /**
   * Executes the SendWelcomeEmailUseCase to send the welcome email.
   */
  await sendWelcomeEmailUseCase.execute(
    `${jsonObject.firstName} ${jsonObject.lastName}`,
    jsonObject.email,
  );
}

export { sendWelcomeEmailComposer };
