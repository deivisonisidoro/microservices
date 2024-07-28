import { PrismaClient } from '@prisma/client';
import { AbstractCustomerRepository } from '../../application/repositories/Customer';
import { CreateCustomerRequestDto } from '../../domain/dtos/customer/Create';
import { ReadCustomerRequestDto } from '../../domain/dtos/customer/ReadCustomer';
import { ReadCustomersRequestDto } from '../../domain/dtos/customer/ReadCustomers';
import { UpdateCustomerRequestDto } from '../../domain/dtos/customer/Update';
import { Customer } from '../../domain/entities/Customer';

/**
 * Implementation of CustomerRepository using Prisma as the data source.
 */
export class PrismaCustomerRepository implements AbstractCustomerRepository {
  /**
   * Constructs the PrismaCustomerRepository.
   * @param {PrismaClient} prisma - The Prisma client instance.
   */
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates a new customer.
   * @param {CreateCustomerRequestDto} createCustomerRequestDto - Data to create the customer.
   * @returns {Promise<Customer>} The created customer.
   */
  async createCustomer(
    createCustomerRequestDto: CreateCustomerRequestDto,
  ): Promise<Customer> {
    const createdPrismaCustomer = await this.prisma.customer.create({
      data: {
        email: createCustomerRequestDto.email.toString(),
        externalId: createCustomerRequestDto.externalId.toString(),
        password: createCustomerRequestDto.password.toString(),
      },
    });

    return this.mapPrismaCustomerToCustomerEntity(createdPrismaCustomer);
  }

  /**
   * Retrieves a customer based on the provided data.
   * @param {ReadCustomersRequestDto} data - The data of the customer to retrieve.
   * @returns {Promise<Customer | null>} The customer if found, or null if not found.
   */
  async getCustomer(data: ReadCustomerRequestDto): Promise<Customer | null> {
    const { email, externalId } = data;

    const where = {
      ...(email && { email }),
      ...(externalId && { externalId }),
    };

    if (externalId) where.externalId = externalId;
    else if (email) where.email = email;

    const customer = await this.prisma.customer.findFirst({ where });
    return customer ? this.mapPrismaCustomerToCustomerEntity(customer) : null;
  }

  /**
   * Retrieves customers based on the provided data.
   * @param {ReadCustomersRequestDto} data - The data to filter customers.
   * @returns {Promise<Customer[]>} An array of customers that match the criteria.
   */
  async getCustomers(data: ReadCustomersRequestDto): Promise<Customer[]> {
    const { email, externalId } = data;

    const where = {
      ...(email && { email }),
      ...(externalId && { externalId }),
    };

    const customers = await this.prisma.customer.findMany({ where });

    return customers.map((customer) =>
      this.mapPrismaCustomerToCustomerEntity(customer),
    );
  }
  /**
   * Updates a customer.
   * @param {string} customerId - The ID of the customer to update.
   * @param {UpdateCustomerRequestDto} UpdateCustomerRequestDto - Data to update the customer.
   * @returns {Promise<Customer | null>} The updated customer if found and updated, or null if not found.
   */
  async updateCustomer(
    customerId: string,
    updateCustomerRequestDto: UpdateCustomerRequestDto,
  ): Promise<Customer | null> {
    const updatedCustomer = await this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        email: updateCustomerRequestDto.email?.toString(),
      },
    });
    return updatedCustomer
      ? this.mapPrismaCustomerToCustomerEntity(updatedCustomer)
      : null;
  }

  /**
   * Deletes a customer by ID.
   * @param {string} customerId - The ID of the customer to delete.
   * @returns {Promise<boolean>} True if the customer was deleted successfully, false otherwise.
   */
  async deleteCustomer(customerId: string): Promise<boolean> {
    const deletedCustomer = await this.prisma.customer.delete({
      where: {
        externalId: customerId,
      },
    });
    return !!deletedCustomer;
  }

  /**
   * Maps a Prisma customer object to a Customer entity.
   * @param {any} prismaCustomer - The Prisma customer object.
   * @returns {Customer} The Customer entity.
   */
  private mapPrismaCustomerToCustomerEntity(prismaCustomer: any): Customer {
    return {
      id: prismaCustomer.id,
      email: prismaCustomer.email,
      externalId: prismaCustomer.externalId,
      password: prismaCustomer.password
    };
  }
}
