import { describe, beforeAll, it, expect } from 'vitest';

import { PrismaCustomersRepository } from '../../../../src/infrastructure/repositories/prisma/Customers';
import { prisma } from '../../../helpers/db/prisma';

describe('PrismaCustomersRepository', () => {
  let customersRepository: PrismaCustomersRepository;

  beforeAll(() => {
    customersRepository = new PrismaCustomersRepository(prisma);
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      // Arrange
      const customerData = {
        email: 'test@example.com',
        externalId: '123',
        firstName: 'John',
        lastName: 'Doe',
      };

      // Act
      await customersRepository.create(customerData);

      // Assert
      const createdCustomer = await prisma.customer.findFirst({
        where: { email: 'test@example.com' },
      });
      expect(createdCustomer).toBeTruthy();
      expect(createdCustomer?.email).toBe(customerData.email);
      expect(createdCustomer?.externalId).toBe(customerData.externalId);
      expect(createdCustomer?.firstName).toBe(customerData.firstName);
      expect(createdCustomer?.lastName).toBe(customerData.lastName);
    });
  });

  describe('getByEmail', () => {
    it('should return null if customer does not exist', async () => {
      // Act
      const customer = await customersRepository.getByEmail(
        'nonexistent@example.com',
      );

      // Assert
      expect(customer).toBeNull();
    });

    it('should return the customer if it exists', async () => {
      // Arrange
      const customerData = {
        email: 'existing@example.com',
        externalId: '456',
        firstName: 'Jane',
        lastName: 'Smith',
      };
      await prisma.customer.create({ data: customerData });

      // Act
      const customer = await customersRepository.getByEmail(
        'existing@example.com',
      );

      // Assert
      expect(customer).toBeTruthy();
      expect(customer?.email).toBe(customerData.email);
      expect(customer?.externalId).toBe(customerData.externalId);
      expect(customer?.firstName).toBe(customerData.firstName);
      expect(customer?.lastName).toBe(customerData.lastName);
    });
  });
});
