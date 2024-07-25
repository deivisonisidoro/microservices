/**
 * Abstract class for the provider responsible for managing and validating tokens.
 *
 * @class
 */
export abstract class AbstractTokenManagerProvider {
  /**
   * Validates the age of a token based on its expiration time.
   *
   * @param {number} expires_in - The expiration time of the token in seconds.
   * @returns {boolean} A boolean indicating whether the token is still valid based on its age.
   */
  abstract validateTokenAge(expires_in: number): boolean;

  /**
   * Validates the integrity and format of a token.
   *
   * @param {string} token - The token to be validated.
   * @returns {boolean} A boolean indicating whether the token is valid.
   */
  abstract validateToken(token: string): boolean;
}
