/**
 * DTO for fetching customers information.
 */
export class ReadCustomersRequestDto {
  /**
   * The email of the customer.
   *
   * @type {string}
   * @memberof ReadCustomersRequestDto
   * @example 'customer@example.com'
   */
  email?: string;

  /**
   * The ID of the customer.
   *
   * @type {string}
   * @memberof ReadCustomersRequestDto
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  externalId?: string;

}
