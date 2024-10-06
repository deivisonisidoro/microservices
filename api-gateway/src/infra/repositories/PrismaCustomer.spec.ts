import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from './PrismaCustomer';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    customer: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

describe('PrismaCustomerRepository', () => {
  let repository: PrismaCustomerRepository;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
    repository = new PrismaCustomerRepository(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should create a customer', async () => {
      const createCustomerDto = {
        externalId: 'externalId',
        email: 'test@example.com',
        password: 'password123',
      };
      const createdCustomer = { id: 'customerId', ...createCustomerDto };

      (prisma.customer.create as jest.Mock).mockResolvedValue(createdCustomer);

      const result = await repository.createCustomer(createCustomerDto);

      expect(prisma.customer.create).toHaveBeenCalledWith({
        data: {
          externalId: createCustomerDto.externalId,
          email: createCustomerDto.email,
          password: createCustomerDto.password,
        },
      });
      expect(result).toEqual(createdCustomer);
    });
  });

  describe('getCustomer', () => {
    it('should retrieve a customer by email', async () => {
      const readCustomerDto = { email: 'test@example.com' };
      const foundCustomer = { id: 'customerId', ...readCustomerDto };

      (prisma.customer.findFirst as jest.Mock).mockResolvedValue(foundCustomer);

      const result = await repository.getCustomer(readCustomerDto);

      expect(prisma.customer.findFirst).toHaveBeenCalledWith({
        where: {
          email: readCustomerDto.email,
        },
      });
      expect(result).toEqual(foundCustomer);
    });
  });

  describe('getCustomers', () => {
    it('should retrieve customers based on criteria', async () => {
      const readCustomersDto = {
        externalId: 'externalId',
        email: 'test@example.com',
      };
      const foundCustomers = [{ id: 'customerId', ...readCustomersDto }];

      (prisma.customer.findMany as jest.Mock).mockResolvedValue(foundCustomers);

      const result = await repository.getCustomers(readCustomersDto);

      expect(prisma.customer.findMany).toHaveBeenCalledWith({
        where: {
          email: readCustomersDto.email,
          externalId: readCustomersDto.externalId,
        },
      });
      expect(result).toEqual(foundCustomers);
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer', async () => {
      const customerId = 'customerId';
      const updateCustomerDto = {
        externalId: 'externalId',
        email: 'new@example.com',
        password: 'newPassword123',
      };
      const updatedCustomer = { id: customerId, ...updateCustomerDto };

      (prisma.customer.update as jest.Mock).mockResolvedValue(updatedCustomer);

      const result = await repository.updateCustomer(
        customerId,
        updateCustomerDto,
      );

      expect(prisma.customer.update).toHaveBeenCalledWith({
        where: {
          id: customerId,
        },
        data: {
          email: updateCustomerDto.email,
        },
      });
      expect(result).toEqual(updatedCustomer);
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer by ID', async () => {
      const customerId = 'customerId';

      (prisma.customer.delete as jest.Mock).mockResolvedValue(true);

      const result = await repository.deleteCustomer(customerId);

      expect(prisma.customer.delete).toHaveBeenCalledWith({
        where: {
          externalId: customerId,
        },
      });
      expect(result).toBe(true);
    });
  });
});
