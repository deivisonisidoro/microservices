import { RefreshTokenDTO } from '../../../../domain/dtos/auth/RefreshToken';
import { RefreshTokenCustomerDTO } from '../../../../domain/dtos/auth/RefreshTokenCustomer';
import { Either } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';

export type RefreshTokenResponse = Either<
  RequiredParametersError,
  { refreshToken?: RefreshTokenDTO; token: string }
>;

/**
 * Abstract class for the use case of refreshing a user's authentication token.
 *
 * This abstract class defines the contract for a use case responsible for refreshing
 * a user's authentication token using a provided refresh token identifier.
 *
 * @class
 */
export abstract class AbstractRefreshTokenUseCase {
  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {RefreshTokenCustomerDTO} refreshToken - The refresh token information.
   * @returns {Promise<RefreshToken>} The response data.
   *
   * @remarks
   * This method is responsible for handling the logic of refreshing a user's
   * authentication token based on the provided refresh token identifier.
   */
  abstract execute(
    refreshToken: RefreshTokenCustomerDTO,
  ): Promise<RefreshTokenResponse>;
}
