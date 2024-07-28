import { CreateCustomerRequestDto } from '../../../../domain/dtos/customer/Create';
import { Customer } from '../../../../domain/entities/Customer';
import { CustomerErrorMessageEnum } from '../../../../domain/enums/customer/ErrorMessage';
import { left } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractKafkaProducer } from '../../../providers/kafka/producer';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { AbstractCustomerRepository } from '../../../repositories/Customer';
import { CreateCustomerUseCase } from './CreateCustomer';

describe('CreateCustomerUseCase', () => {
  let customerRepository: AbstractCustomerRepository;
  let passwordHasher: AbstractPasswordHasher;
  let kafkaProducer: AbstractKafkaProducer;
  let createCustomerUseCase: CreateCustomerUseCase;
  const createCustomerRequestDto: CreateCustomerRequestDto = {
    email: 'test@example.com',
    externalId: 'test',
    password: 'test'
  };
  const mockCustomer: Customer = {
    id: '1',
    email: 'test@example.com',
    externalId: 'password',
    password: 'test'
  };
  const customerAlreadyExists = left(
    new RequiredParametersError(
      CustomerErrorMessageEnum.CustomerAlreadyExists,
      400,
    ),
  );

  beforeEach(() => {
    customerRepository = {
      getCustomer: jest.fn(),
      createCustomer: jest.fn(),
      getAllCustomers: jest.fn(),
      getCustomerById: jest.fn(),
      updateCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
    } as unknown as AbstractCustomerRepository;

    passwordHasher = {
      hashPassword: jest.fn(),
    } as unknown as AbstractPasswordHasher;

    kafkaProducer = {
      execute: jest.fn(),
    } as unknown as AbstractKafkaProducer;

    createCustomerUseCase = new CreateCustomerUseCase(customerRepository, passwordHasher);
  });

  it('should create a new customer when customer does not exist', async () => {
    (customerRepository.getCustomer as jest.Mock).mockResolvedValue(null);
    (passwordHasher.hashPassword as jest.Mock).mockResolvedValue(
      'hashedPassword',
    );
    (customerRepository.createCustomer as jest.Mock).mockResolvedValue(
      mockCustomer,
    );

    const result = await createCustomerUseCase.execute(
      createCustomerRequestDto,
    );

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(mockCustomer);
    expect(customerRepository.getCustomer).toHaveBeenCalledWith({
      email: createCustomerRequestDto.email,
    });
    expect(customerRepository.createCustomer).toHaveBeenCalledWith({
      ...createCustomerRequestDto,
      password: 'hashedPassword',
    });
    expect(kafkaProducer.execute).toHaveBeenCalledWith('CUSTOMER_CREATED', mockCustomer);
  });

  it('should return error when customer already exists', async () => {
    (customerRepository.getCustomer as jest.Mock).mockResolvedValue({});

    const result = await createCustomerUseCase.execute(
      createCustomerRequestDto,
    );

    expect(result.isLeft()).toBe(true);
    expect(result.value.constructor).toBe(RequiredParametersError);
    expect(result.value).toStrictEqual(customerAlreadyExists.value);
    expect(customerRepository.getCustomer).toHaveBeenCalledWith({
      email: createCustomerRequestDto.email,
    });
    expect(passwordHasher.hashPassword).not.toHaveBeenCalled();
    expect(customerRepository.createCustomer).not.toHaveBeenCalled();
  });
});
