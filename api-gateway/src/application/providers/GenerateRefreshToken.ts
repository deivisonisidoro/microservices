/**
 * class for the provider responsible for generating refresh tokens.
 *
 * @class
 */
export abstract class AbstractGenerateRefreshTokenProvider {
  /**
   * Generates a new refresh token based on the provided token.
   *
   * @async
   * @param {string} token - The token used as a basis for generating the refresh token.
   * @returns {Promise<string>} The generated refresh token.
   */
  abstract generateToken(token: string): Promise<string>;
}
