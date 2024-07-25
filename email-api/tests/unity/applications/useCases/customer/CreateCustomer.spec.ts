import { vi, describe, afterEach, it, expect, beforeAll } from 'vitest';

import { CreateCustomerUseCase } from '../../../../../src/application/usecases/customer/CreateCustomer';
import { CreateCustomerDTO } from '../../../../../src/domain/dtos/customers/CreateCustomer';
import { CustomerRepository } from '../../../../../src/domain/repositories/Customer';
import { CreateCustomerUseCaseInterface } from '../../../../../src/domain/useCases/customers/CreateCustomers';

describe('CreateCustomerUseCase', () => {
  let createCustomerUseCase: CreateCustomerUseCaseInterface;
  let mockCustomerRepository: CustomerRepository;

  beforeAll(() => {
    mockCustomerRepository = {
      create: vi.fn(),
      getByEmail: vi.fn(),
    };

    createCustomerUseCase = new CreateCustomerUseCase(mockCustomerRepository);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new customer when the email does not exist', async () => {
    const testData: CreateCustomerDTO = {
      externalId: '123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'lastName',
    };

    mockCustomerRepository.getByEmail = vi.fn().mockResolvedValueOnce(null);
    mockCustomerRepository.create = vi.fn().mockResolvedValueOnce({
      id: '123',
      ...testData,
    });

    await createCustomerUseCase.execute(testData);

    expect(mockCustomerRepository.getByEmail).toHaveBeenCalledWith(
      testData.email,
    );
    expect(mockCustomerRepository.create).toHaveBeenCalledWith(testData);
  });

  it('should not create a new customer when the email already exists', async () => {
    const testData: CreateCustomerDTO = {
      externalId: '123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'lastName',
    };

    mockCustomerRepository.getByEmail = vi.fn().mockResolvedValueOnce(testData);

    await createCustomerUseCase.execute(testData);

    expect(mockCustomerRepository.create).not.toHaveBeenCalled();
  });
});
