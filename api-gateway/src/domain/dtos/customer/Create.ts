/**
 * DTO (Data Transfer Object) for creating a customer.
 */
export class CreateCustomerRequestDto {
  /**
   * The external id of the customer.
   *
   * @type {string}
   * @memberof CreateCustomerRequestDto
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  externalId: string;
  /**
   * The email address of the customer.
   *
   * @type {string}
   * @memberof CreateCustomerRequestDto
   * @example 'customer@example.com'
   */
  email: string;


  /**
   * The password of the customer.
   *
   * @type {string}
   * @memberof CreateCustomerRequestDto
   * @example 'password123'
   */
  password: string;

  /**
   * Constructs a new CreateCustomerRequestDto object.
   * @param {string} email - The email address of the customer.
   * @param {string} externalId - The external identifier of the customer.
   * @param {string} password - The password of the customer.
   */
  constructor(
    email: string,
    externalId: string,
    password: string
  ) {
    this.email = email;
    this.externalId = externalId;
    this.password = password
  }
}
