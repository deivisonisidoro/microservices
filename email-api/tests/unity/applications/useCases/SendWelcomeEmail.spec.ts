import { describe, beforeEach, it, vi, expect } from 'vitest';

import { SendWelcomeEmailUseCase } from '../../../../src/application/usecases/sendWelcomeEmail/SendWelcomeEmail';
import { SendWelcomeEmailUseCaseInterface } from '../../../../src/application/usecases/sendWelcomeEmail/SendWelcomeEmailInterface';
import { EmailGeneratorInterface } from '../../../../src/domain/generators/emailGenerators/EmailGenerator';
import { EmailSenderInterface } from '../../../../src/domain/providers/EmailSender';

describe('SendWelcomeEmailUseCase', () => {
  let emailSenderMock: EmailSenderInterface;
  let emailGeneratorMock: EmailGeneratorInterface;
  let sendWelcomeEmailUseCase: SendWelcomeEmailUseCaseInterface;

  beforeEach(() => {
    emailSenderMock = {
      send: vi.fn().mockResolvedValue(undefined),
    };

    emailGeneratorMock = {
      execute: vi.fn().mockReturnValue({
        to: 'recipient@example.com',
        subject: 'Welcome to Our Platform!',
        body: 'Welcome message',
      }),
    };

    sendWelcomeEmailUseCase = new SendWelcomeEmailUseCase(
      emailSenderMock,
      emailGeneratorMock,
    );
  });

  it('should send welcome email successfully', async () => {
    const username = 'testuser';
    const email = 'testuser@example.com';

    await sendWelcomeEmailUseCase.execute(username, email);

    expect(emailGeneratorMock.execute).toHaveBeenCalledWith(username, email);
    expect(emailSenderMock.send).toHaveBeenCalledWith({
      to: email,
      subject: 'Welcome to Our Platform!',
      body: 'Welcome message',
    });
  });
});
