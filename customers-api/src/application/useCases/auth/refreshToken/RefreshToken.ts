import { RefreshTokenDTO } from '../../../../domain/dtos/auth/RefreshToken';
import { RefreshTokenCustomerDTO } from '../../../../domain/dtos/auth/RefreshTokenCustomer';
import { AuthErrorMessageEnum } from '../../../../domain/enums/auth/ErrorMessage';
import { left, right } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractGenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken';
import { AbstractTokenManagerProvider } from '../../../providers/TokenMagerProvider';
import { AbstractRefreshTokenRepository } from '../../../repositories/RefreshToken';
import {
  AbstractRefreshTokenUseCase,
  RefreshTokenResponse,
} from './AbstractRefreshToken';

/**
 * Use case for refreshing a customer's authentication token.
 *
 * @class
 * @implements {AbstractRefreshTokenUseCase}
 */
export class RefreshTokenUseCase implements AbstractRefreshTokenUseCase {
  /**
   * Creates an instance of RefreshTokencustomerUseCase.
   *
   * @constructor
   * @param {AbstractGenerateRefreshTokenProvider} generateRefreshTokenProvider - The refresh token generator provider.
   * @param {AbstractRefreshTokenRepository} refreshTokenRepository - The repository for refresh tokens.
   * @param {AbstractTokenManagerProvider} tokenManager - The token manager provider.
   */
  constructor(
    private generateRefreshTokenProvider: AbstractGenerateRefreshTokenProvider,
    private refreshTokenRepository: AbstractRefreshTokenRepository,
    private tokenManager: AbstractTokenManagerProvider,
  ) {}

  /**
   * Executes the refresh token customer use case.
   *
   * @async
   * @param {IRefreshTokencustomerDTO} refreshTokenId - The refresh token information.
   * @returns {Promise<RefreshToken>} The response data.
   */
  async execute({
    refreshTokenId,
  }: RefreshTokenCustomerDTO): Promise<RefreshTokenResponse> {
    const refreshToken = (await this.refreshTokenRepository.findById(
      refreshTokenId,
    )) as RefreshTokenDTO | null;

    if (!refreshToken) {
      return left(
        new RequiredParametersError(AuthErrorMessageEnum.TokenInvalidOrExpired),
      );
    }

    const refreshTokenExpired = this.tokenManager.validateTokenAge(
      refreshToken.expires_in,
    );
    const token = await this.generateRefreshTokenProvider.generateToken(
      refreshToken.customer_id,
    );

    if (refreshTokenExpired) {
      await this.refreshTokenRepository.delete(refreshToken.customer_id);
      const newRefreshToken = await this.refreshTokenRepository.create(
        refreshToken.customer_id,
      );
      return right({ refreshToken: newRefreshToken, token });
    }

    return right({ token });
  }
}
