import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { describe, beforeEach, it, expect, vi, Mock } from 'vitest';

import { EmailEntity } from '../../../../src/domain/entities/Email';
import { EmailGeneratorInterface } from '../../../../src/domain/generators/emailGenerators/EmailGenerator';
import { WelcomeEmailGenerator } from '../../../../src/infrastructure/generators/WelcomeEmailGenerator';

vi.mock('fs');

describe('WelcomeEmailGenerator', () => {
  let generator: EmailGeneratorInterface;

  beforeEach(() => {
    const mockTemplateSource = 'Mock template source';
    (fs.readFileSync as Mock).mockReturnValue(mockTemplateSource);

    const compileMock = vi.fn().mockReturnValue(vi.fn());
    vi.spyOn(Handlebars, 'compile').mockImplementation(compileMock);

    generator = new WelcomeEmailGenerator();
  });

  it('should generate welcome email with correct content', () => {
    const username = 'testUser';
    const email = 'test@example.com';
    const mockTemplateSource = 'Mock template source';
    const mockCompiledTemplate = vi.fn().mockReturnValue('Mock HTML content');

    (fs.readFileSync as Mock).mockReturnValue(mockTemplateSource);

    (Handlebars.compile as Mock).mockReturnValue(mockCompiledTemplate);

    const emailEntity = generator.execute(username, email);

    const expectedSubject = `Welcome, ${username}!`;
    const expectedHtmlContent = 'Mock HTML content';

    expect(emailEntity).toBeInstanceOf(EmailEntity);
    expect(emailEntity.to).toBe(email);
    expect(emailEntity.subject).toBe(expectedSubject);
    expect(emailEntity.body).toBe(expectedHtmlContent);
  });

  it('should read template file from correct path', () => {
    const expectedPath = path.resolve(
      __dirname,
      '../../../../src/infrastructure/templates/welcome.html',
    );

    generator.execute('testUser', 'test@example.com');

    expect(fs.readFileSync).toHaveBeenCalledWith(expectedPath, 'utf8');
  });

  it('should compile template using Handlebars', () => {
    generator.execute('testUser', 'test@example.com');

    expect(Handlebars.compile).toHaveBeenCalled();
  });
});
