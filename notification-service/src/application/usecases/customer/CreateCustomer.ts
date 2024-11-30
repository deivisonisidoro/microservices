/**
 * Represents a use case implementation for creating a new customer.
 * This class implements the CreateCustomerUseCaseInterface and provides functionality
 * to execute the creation of a new customer based on the provided data.
 */
import { CreateCustomerDTO } from '../../../domain/dtos/customers/CreateCustomer';
import { CustomerRepository } from '../../../domain/repositories/Customer';
import { CreateCustomerUseCaseInterface } from '../../../domain/useCases/customers/CreateCustomers';

export class CreateCustomerUseCase implements CreateCustomerUseCaseInterface {
  /**
   * Constructs a new CreateCustomerUseCase instance.
   * @param customerRepository - An instance of the CustomerRepository interface for managing customer data.
   */
  constructor(private customerRepository: CustomerRepository) {}

  /**
   * Executes the use case to create a new customer.
   * @param data - The data required to create the customer, represented by a CreateCustomerDTO object.
   * @returns A Promise that resolves when the customer is successfully created, or rejects with an error.
   */
  async execute(data: CreateCustomerDTO): Promise<void> {
    const customerEntity = await this.customerRepository.getByEmail(data.email);
    if (!customerEntity) {
      await this.customerRepository.create(data);
    }
  }
}
