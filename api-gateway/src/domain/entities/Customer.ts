/**
 * Represents a customer in the system.
 */
export class Customer {
  id: string;
  email: string;
  externalId: string;
  password: string;

  /**
   * Constructs a new Customer object.
   * @param {string} id - The unique identifier for the customer.
   * @param {string} email - The email address of the customer.
   * @param {string} externalId - The external ID of the customer.
   * @param {string} password - The password for the customer.
   */
  constructor(
    id: string,
    email: string,
    externalId: string,
    password: string
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.externalId = externalId;
  }
}
