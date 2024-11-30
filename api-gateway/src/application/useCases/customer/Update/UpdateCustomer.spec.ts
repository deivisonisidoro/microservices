
import { AbstractCustomerRepository } from '../../../repositories/Customer';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { UpdateCustomerRequestDto } from '../../../../domain/dtos/customer/Update';
import { CustomerErrorMessageEnum } from '../../../../domain/enums/customer/ErrorMessage';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { left, right } from '../../../../domain/utils/either/either';
import { UpdateCustomerUseCase } from './UpdateCustomer';

describe('UpdateCustomerUseCase', () => {
  let updateCustomerUseCase: UpdateCustomerUseCase;
  let customerRepository: jest.Mocked<AbstractCustomerRepository>;
  let passwordHasher: jest.Mocked<AbstractPasswordHasher>;

  beforeEach(() => {
    customerRepository = {
      getCustomer: jest.fn(),
      updateCustomer: jest.fn(),
    } as unknown as jest.Mocked<AbstractCustomerRepository>;

    passwordHasher = {
      hashPassword: jest.fn(),
    } as unknown as jest.Mocked<AbstractPasswordHasher>;

    updateCustomerUseCase = new UpdateCustomerUseCase(
      customerRepository,
      passwordHasher,
    );
  });

  it('should return an error if the customer does not exist', async () => {
    customerRepository.getCustomer.mockResolvedValue(null);

    const response = await updateCustomerUseCase.execute('123', {
      email: 'test@test.com',
    } as UpdateCustomerRequestDto);

    expect(customerRepository.getCustomer).toHaveBeenCalledWith({
      externalId: '123',
    });
    expect(response.isLeft()).toBe(true);
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(RequiredParametersError);
      expect(response.value.message).toBe(
        CustomerErrorMessageEnum.CustomerDoesNotExist,
      );
    }
  });

  it('should hash the password if provided in the update request', async () => {
    customerRepository.getCustomer.mockResolvedValue({
        id: '123',
        externalId: '1',
        email: 'test1@example.com',
        password: 'password',
    });
    passwordHasher.hashPassword.mockResolvedValue('hashed_password');
    customerRepository.updateCustomer.mockResolvedValue({
      id: '123',
      password: 'hashed_password',
      externalId: '1',
      email: 'updated@example.com',
    });

    const response = await updateCustomerUseCase.execute('123', {
      password: 'new_password',
    } as UpdateCustomerRequestDto);

    expect(passwordHasher.hashPassword).toHaveBeenCalledWith('new_password');
    expect(customerRepository.updateCustomer).toHaveBeenCalledWith('123', {
      password: 'hashed_password',
    });
    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value).toEqual({
        id: '123',
        password: 'hashed_password',
        externalId: '1',
        email: 'updated@example.com',
      });
    }
  });

  it('should update the customer without hashing the password if not provided', async () => {
    customerRepository.getCustomer.mockResolvedValue({
      id: '123',
      externalId: '1',
      email: 'test1@example.com',
      password: 'password',
    });
    customerRepository.updateCustomer.mockResolvedValue({
      id: '123',
      externalId: '1',
    email: 'test1@example.com',
    password: 'password',
    });

    const response = await updateCustomerUseCase.execute('123', {
       email: 'test1@example.com',
    } as UpdateCustomerRequestDto);

    expect(passwordHasher.hashPassword).not.toHaveBeenCalled();
    expect(customerRepository.updateCustomer).toHaveBeenCalledWith('123', {
       email: 'test1@example.com',
    });
    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value).toEqual({
        id: '123',
        email: 'test1@example.com',
        externalId: '1',
        password: 'password',
      });
    }
  });
});
