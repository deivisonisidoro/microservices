import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

import { EmailEntity } from '../../domain/entities/Email';
import { EmailGeneratorInterface } from '../../domain/generators/emailGenerators/EmailGenerator';
import { EnvironmentVariables } from '../config/EnvironmentVariables';

/**
 * Class responsible for generating email content based on templates.
 */
export class WelcomeEmailGenerator implements EmailGeneratorInterface {
  private templatePath: string;
  private env = EnvironmentVariables.getInstance();
  constructor() {
    this.templatePath = path.resolve(
      __dirname,
      `${this.env.getTemplateLocation()}/welcome.html`,
    );
  }

  /**
   * Generates a welcome email for the given username and email address.
   * @param {string} username - The username of the recipient.
   * @param {string} email - The email address of the recipient.
   * @returns {EmailEntity} The generated email entity.
   */
  execute(username: string, email: string): EmailEntity {
    const templateSource = fs.readFileSync(this.templatePath, 'utf8');
    const welcomeTemplate = Handlebars.compile(templateSource);

    const htmlContent = welcomeTemplate({ username, email });

    const subject = `Welcome, ${username}!`;
    return new EmailEntity(email, subject, htmlContent);
  }
}
