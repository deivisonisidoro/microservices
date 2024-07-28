/**
 * DTO (Data Transfer Object) for updating a customer.
 */
export class UpdateCustomerRequestDto {
  /**
   * The new email of the customer.
   *
   * @type {string}
   * @memberof UpdateCustomerRequestDto
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

  /**
   * The new password of the customer.
   *
   * @type {string}
   * @memberof UpdateCustomerRequestDto
   * @example 'newpassword123'
   */
  password?: string;


 
  /**
   * Creates an instance of UpdateCustomerRequestDto.
   * @param {string} email - The new email of the customer.
   * @param {string} externalId - The new external ID of the customer.
   * @param {string} password - The new password of the customer.
   */
  constructor(
    email?: string,
    externalId?: string,
    password?: string,
  ) {
    if (email) this.email = email;
    if (externalId) this.externalId = externalId;
    if (password) this.password = password;
  }
}
