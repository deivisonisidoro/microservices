/**
 * Represents the data transfer object (DTO) for creating a new customer.
 * This interface defines the structure of the data required to create a new customer.
 */
export interface CreateCustomerDTO {
  /** The external identifier of the customer. */
  externalId: string;

  /** The email address of the customer. */
  email: string;

  /** The first name of the customer. */
  firstName: string;

  /** The last name of the customer. */
  lastName: string;
}
