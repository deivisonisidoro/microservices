import { CreateCustomerDTO } from '../../dtos/customers/CreateCustomer';

/**
 * Represents a use case for creating a new customer.
 * This interface defines the method signature for executing the creation of a new customer.
 */
export interface CreateCustomerUseCaseInterface {
  /**
   * Executes the use case to create a new customer.
   * @param data - The data required to create the customer, represented by a CreateCustomerDTO object.
   * @returns A Promise that resolves when the customer is successfully created, or rejects with an error.
   */
  execute(data: CreateCustomerDTO): Promise<void>;
}
