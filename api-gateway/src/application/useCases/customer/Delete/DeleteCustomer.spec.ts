import { ReadCustomerRequestDto } from '../../../../domain/dtos/customer/ReadCustomer';
import { CustomerErrorMessageEnum } from '../../../../domain/enums/customer/ErrorMessage';
import { left } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractCustomerRepository } from '../../../repositories/Customer';
import { DeleteCustomerUseCase } from './DeleteCustomer';

describe('DeleteCustomerUseCase', () => {
  let customerRepository: AbstractCustomerRepository;
  let deleteCustomerUseCase: DeleteCustomerUseCase;
  const customerDoesNotExist = left(
    new RequiredParametersError(
      CustomerErrorMessageEnum.CustomerDoesNotExist,
      400,
    ),
  );
  const customerDTO = new  ReadCustomerRequestDto(
    "test@email.com",
    "test-id",
  )

  beforeEach(() => {
    customerRepository = {
      getCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
    } as unknown as AbstractCustomerRepository;

    deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository);
  });

  it('should return error when customer does not exist', async () => {
    (customerRepository.getCustomer as jest.Mock).mockResolvedValue(null);

    const result = await deleteCustomerUseCase.execute(customerDTO);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toStrictEqual(customerDoesNotExist.value);
    expect(customerRepository.getCustomer).toHaveBeenCalledWith(customerDTO);
    expect(customerRepository.deleteCustomer).not.toHaveBeenCalled();
  });

  it('should return true when customer is deleted successfully', async () => {
    (customerRepository.getCustomer as jest.Mock).mockResolvedValue({});
    (customerRepository.deleteCustomer as jest.Mock).mockResolvedValue(true);

    const result = await deleteCustomerUseCase.execute(customerDTO);

    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(true);
    expect(customerRepository.getCustomer).toHaveBeenCalledWith(customerDTO);
    expect(customerRepository.deleteCustomer).toHaveBeenCalledWith(customerDTO.externalId);
  });

  it('should return false when customer deletion fails', async () => {
    (customerRepository.getCustomer as jest.Mock).mockResolvedValue({});
    (customerRepository.deleteCustomer as jest.Mock).mockResolvedValue(false);

    const result = await deleteCustomerUseCase.execute(customerDTO);

    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(false);
    expect(customerRepository.getCustomer).toHaveBeenCalledWith(customerDTO);
    expect(customerRepository.deleteCustomer).toHaveBeenCalledWith(
      'test-id',
    );
  });
});
