import { PrismaClient } from '@prisma/client';

import { CreateCustomerDTO } from '../../../domain/dtos/customers/CreateCustomer';
import { CustomerEntity } from '../../../domain/entities/Customer';
import { CustomerRepository } from '../../../domain/repositories/Customer';

/**
 * Repository implementation for managing customer data using Prisma ORM.
 */
export class PrismaCustomersRepository implements CustomerRepository {
  /**
   * Constructs a new instance of PrismaCustomersRepository.
   * @param {PrismaClient} prisma - The Prisma client instance.
   */
  constructor(private prisma: PrismaClient) {}
  /**
   * Maps a Prisma customer entity to a domain customer entity.
   * @param {any} prismaCustomer - The Prisma customer entity.
   * @returns {CustomerEntity} The domain customer entity.
   */
  private mapToCustomerEntity(prismaCustomer: any): CustomerEntity {
    return {
      id: prismaCustomer.id,
      externalId: prismaCustomer.externalId,
      email: prismaCustomer.email,
      firstName: prismaCustomer.firstName,
      lastName: prismaCustomer.lastName,
    };
  }
  /**
   * Creates a new customer.
   * @param {CreateCustomerDTO} data - The data of the customer to create.
   * @returns {Promise<void>} A Promise that resolves when the customer is successfully created.
   */
  async create(data: CreateCustomerDTO): Promise<void> {
    await this.prisma.customer.create({
      data: {
        email: data.email,
        externalId: data.externalId,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }

  /**
   * Finds a customer by email.
   * @param {string} email - The email address of the customer to find.
   * @returns {Promise<CustomerEntity | null>} A Promise that resolves with the found customer or null if not found.
   */
  async getByEmail(email: string): Promise<CustomerEntity | null> {
    const prismaCustomer = await this.prisma.customer.findFirst({
      where: { email },
      select: {
        id: true,
        externalId: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return prismaCustomer ? this.mapToCustomerEntity(prismaCustomer) : null;
  }
}
