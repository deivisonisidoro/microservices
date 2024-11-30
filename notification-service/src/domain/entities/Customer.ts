/**
 * Represents a customer in the system.
 */
export class CustomerEntity {
  id: string;
  externalId: string;
  email: string;
  firstName: string;
  lastName: string;
  /**
   * Constructs a new Customer object.
   * @param {string} id - The unique identifier for the customer.
   * @param {string} externalId - The unique identifier for the customer that came externally.
   * @param {string} email - The email address of the customer.
   * @param {string} firstName - The first name of the customer.
   * @param {string} lastName - The last name of the customer.
   */
  constructor(
    id: string,
    externalId: string,
    email: string,
    firstName: string,
    lastName: string,
  ) {
    this.id = id;
    this.externalId = externalId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
