/**
 * Data Transfer Object (DTO) representing the input for refreshing a Customer's authentication token.
 *
 * @class
 */
export class RefreshTokenCustomerDTO {
  /**
   * The identifier of the refresh token used for authentication token refresh.
   */
  refreshTokenId: string;

  /**
   * Constructs a new RefreshTokenCustomerDTO object.
   * @param {string} refreshTokenId - The identifier of the refresh token.
   */
  constructor(refreshTokenId: string) {
    this.refreshTokenId = refreshTokenId;
  }
}
