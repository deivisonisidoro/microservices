import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../database/nestPrisma/prisma.service';
import { PrismaCustomerRepository } from './PrismaCustomer';

describe('PrismaCustomerRepository', () => {
  let repository: PrismaCustomerRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaCustomerRepository,
        {
          provide: PrismaService,
          useValue: {
            customer: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrismaCustomerRepository>(PrismaCustomerRepository);
    prismaService = module.get<PrismaService>(PrismaService);
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

      (prismaService.customer.create as jest.Mock).mockResolvedValue(
        createdCustomer,
      );

      const result = await repository.createCustomer(createCustomerDto);

      expect(prismaService.customer.create).toHaveBeenCalledWith({
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

      (prismaService.customer.findUnique as jest.Mock).mockResolvedValue(
        foundCustomer,
      );

      const result = await repository.getCustomer(readCustomerDto);

      expect(prismaService.customer.findUnique).toHaveBeenCalledWith({
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

      (prismaService.customer.findMany as jest.Mock).mockResolvedValue(
        foundCustomers,
      );

      const result = await repository.getCustomers(readCustomersDto);

      expect(prismaService.customer.findMany).toHaveBeenCalledWith({
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

      (prismaService.customer.update as jest.Mock).mockResolvedValue(
        updatedCustomer,
      );

      const result = await repository.updateCustomer(
        customerId,
        updateCustomerDto,
      );

      expect(prismaService.customer.update).toHaveBeenCalledWith({
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

      (prismaService.customer.delete as jest.Mock).mockResolvedValue(true);

      const result = await repository.deleteCustomer(customerId);

      expect(prismaService.customer.delete).toHaveBeenCalledWith({
        where: {
          id: customerId,
        },
      });
      expect(result).toBe(true);
    });
  });
});
