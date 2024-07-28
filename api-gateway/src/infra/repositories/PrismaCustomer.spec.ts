import { PrismaClient } from '@prisma/client/scripts/default-index';
import { PrismaCustomerRepository } from './PrismaCustomer';

describe('PrismaCustomerRepository', () => {
  let repository: PrismaCustomerRepository;
  let prisma: PrismaClient;

  beforeEach(async () => {
    repository = new PrismaCustomerRepository(prisma)
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
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      };
      const createdCustomer = { id: 'customerId', ...createCustomerDto };

      (prisma.customer.create as jest.Mock).mockResolvedValue(
        createdCustomer,
      );

      const result = await repository.createCustomer(createCustomerDto);

      expect(prisma.customer.create).toHaveBeenCalledWith({
        data: {
          email: createCustomerDto.email.toString(),
          firstName: createCustomerDto.firstName,
          lastName: createCustomerDto.lastName,
          password: createCustomerDto.password.toString(),
          createdAt: expect.any(Date),
        },
      });
      expect(result).toEqual(createdCustomer);
    });
  });

  describe('getCustomer', () => {
    it('should retrieve a customer by email', async () => {
      const readCustomerDto = { email: 'test@example.com' };
      const foundCustomer = { id: 'customerId', ...readCustomerDto };

      (prisma.customer.findUnique as jest.Mock).mockResolvedValue(
        foundCustomer,
      );

      const result = await repository.getCustomer(readCustomerDto);

      expect(prisma.customer.findUnique).toHaveBeenCalledWith({
        where: {
          email: readCustomerDto.email,
        },
      });
      expect(result).toEqual(foundCustomer);
    });
  });

  describe('getCustomers', () => {
    it('should retrieve customers based on criteria', async () => {
      const readCustomersDto = { firstName: 'John' };
      const foundCustomers = [{ id: 'customerId', ...readCustomersDto }];

      (prisma.customer.findMany as jest.Mock).mockResolvedValue(
        foundCustomers,
      );

      const result = await repository.getCustomers(readCustomersDto);

      expect(prisma.customer.findMany).toHaveBeenCalledWith({
        where: {
          firstName: readCustomersDto.firstName,
        },
      });
      expect(result).toEqual(foundCustomers);
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer', async () => {
      const customerId = 'customerId';
      const updateCustomerDto = { firstName: 'Jane' };
      const updatedCustomer = { id: customerId, ...updateCustomerDto };

      (prisma.customer.update as jest.Mock).mockResolvedValue(
        updatedCustomer,
      );

      const result = await repository.updateCustomer(
        customerId,
        updateCustomerDto,
      );

      expect(prisma.customer.update).toHaveBeenCalledWith({
        where: {
          id: customerId,
        },
        data: {
          firstName: updateCustomerDto.firstName,
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
          id: customerId,
        },
      });
      expect(result).toBe(true);
    });
  });
});
