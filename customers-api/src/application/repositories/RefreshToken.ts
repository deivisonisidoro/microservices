import { RefreshTokenDTO } from '../../domain/dtos/auth/RefreshToken';

/**
 * class for the repository handling refresh tokens.
 *
 * @class
 */
export abstract class AbstractRefreshTokenRepository {
  /**
   * Creates a new refresh token for the specified customer.
   *
   * @async
   * @param {string} customer_id - The ID of the customer.
   * @returns {Promise<RefreshTokenDTO>} The created refresh token.
   */
  abstract create(customer_id: string): Promise<RefreshTokenDTO>;

  /**
   * Finds a refresh token by its identifier.
   *
   * @async
   * @param {string} refreshToken - The refresh token identifier.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  abstract findById(refreshToken: string): Promise<RefreshTokenDTO | unknown>;

  /**
   * Finds a refresh token by the customer's ID.
   *
   * @async
   * @param {string} customer_id - The ID of the customer.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  abstract findByCustomerId(
    customer_id: string,
  ): Promise<RefreshTokenDTO | unknown>;

  /**
   * Deletes a refresh token associated with the specified customer.
   *
   * @async
   * @param {string} customer_id - The ID of the customer.
   * @returns {Promise<void>} A promise that resolves when the refresh token is deleted.
   */
  abstract delete(customer_id: string): Promise<void>;
}
