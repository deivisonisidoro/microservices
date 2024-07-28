/**
 * DTO for fetching customer information.
 */
export class ReadCustomerRequestDto {
  /**
   * The email of the customer.
   *
   * @type {string}
   * @memberof ReadCustomerRequestDto
   * @example 'customer@example.com'
   */
  email?: string;

  /**
   * The external ID of the customer.
   *
   * @type {string}
   * @memberof ReadCustomerRequestDto
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  externalId?: string;
}
