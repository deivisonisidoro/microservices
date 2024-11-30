import { CreateCustomerDTO } from '../dtos/customers/CreateCustomer';
import { CustomerEntity } from '../entities/Customer';

/**
 * Represents a repository interface for managing customer data.
 * This interface defines methods for creating and retrieving customer entities.
 */
export interface CustomerRepository {
  /**
   * Creates a new customer entity based on the provided data.
   * @param data - The data required to create the customer, represented by a CreateCustomerDTO object.
   * @returns A Promise that resolves when the customer is successfully created, or rejects with an error.
   */
  create(data: CreateCustomerDTO): Promise<void>;

  /**
   * Retrieves a customer entity by their email address.
   * @param email - The email address of the customer to retrieve.
   * @returns A Promise that resolves with the CustomerEntity corresponding to the provided email, or rejects with an error if not found.
   */
  getByEmail(email: string): Promise<CustomerEntity | null>;
}
