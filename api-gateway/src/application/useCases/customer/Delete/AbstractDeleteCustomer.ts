import { Either } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { ReadCustomerRequestDto } from '../../../../domain/dtos/customer/ReadCustomer';

export type DeleteCustomerResponse = Either<RequiredParametersError, boolean>;

/**
 * Abstract class for deleting a customer.
 *
 * @abstract
 * @class
 */
export abstract class AbstractDeleteCustomerUseCase {
  /**
   * Deletes a customer by ID.
   * @abstract
   * @param {ReadCustomerRequestDto} data - The ID of the customer to delete.
   * @returns {Promise<DeleteCustomerResponse>} A promise resolving to true if the customer was deleted successfully, false otherwise.
   */
  abstract execute(data: ReadCustomerRequestDto): Promise<DeleteCustomerResponse>;
}
