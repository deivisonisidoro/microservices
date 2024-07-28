import { AbstractGenerateRefreshTokenProvider } from '../../../../application/providers/GenerateRefreshToken'
import { AbstractTokenManagerProvider } from '../../../../application/providers/TokenMagerProvider'
import { AbstractRefreshTokenRepository } from '../../../../application/repositories/RefreshToken'
import { RefreshTokenUseCase } from '../../../../application/useCases/auth/refreshToken/RefreshToken'
import { AbstractRefreshTokenUseCase } from '../../../../application/useCases/auth/refreshToken/AbstractRefreshToken'
import { RefreshTokenUserController } from '../../../../presentation/http/controllers/Authenticate/RefreshTokenUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { prismaClient } from '../../../databases/prisma/connection'
import { GenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { TokenManagerProvider } from '../../../providers/TokenManager'
import { PrismaRefreshTokenRepository } from '../../../repositories/PrismaRefreshToken'

/**
 * Composer function for creating and configuring the components required for refreshing authentication tokens.
 *
 * @function
 * @returns {IController} The configured refresh token controller.
 */
export function refreshTokenUserComposer(): IController {
  const refreshTokenRepository: AbstractRefreshTokenRepository =
    new PrismaRefreshTokenRepository(prismaClient)
  const generateRefreshTokenProvider: AbstractGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider()
  const tokenManagerProvider: AbstractTokenManagerProvider = new TokenManagerProvider()
  const useCase: AbstractRefreshTokenUseCase = new RefreshTokenUseCase(
    generateRefreshTokenProvider,
    refreshTokenRepository,
    tokenManagerProvider,
  )
  const controller: IController = new RefreshTokenUserController(useCase)
  return controller
}
