/**
 * Unit tests for the GenerateRefreshTokenProvider class using Vitest.
 * @module GenerateRefreshTokenProviderTests
 */

import { AbstractGenerateRefreshTokenProvider } from '../../application/providers/GenerateRefreshToken';
import { GenerateRefreshTokenProvider } from './GenerateRefreshToken';

/**
 * Test suite for the GenerateRefreshTokenProvider class.
 * @function
 * @name GenerateRefreshTokenProviderTests
 */
describe('GenerateRefreshTokenProvider', () => {
  let generateRefreshTokenProvider: AbstractGenerateRefreshTokenProvider;

  /**
   * Function to perform setup operations before each test.
   * @function
   * @name beforeEachTest
   * @description This function initializes the GenerateRefreshTokenProvider instance before each test.
   */
  beforeEach(() => {
    generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
  });

  /**
   * Test case to verify the generateToken method returns a string.
   * @function
   * @name generateTokenShouldReturnString
   */
  test('generateToken should return a string', async () => {
    const token = 'yourToken';

    const generatedToken =
      await generateRefreshTokenProvider.generateToken(token);
    expect(typeof generatedToken).toBe('string');
  });
});
