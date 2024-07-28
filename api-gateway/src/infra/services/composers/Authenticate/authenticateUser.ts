import { AbstractGenerateRefreshTokenProvider } from '../../../../application/providers/GenerateRefreshToken'
import { AbstractPasswordHasher } from '../../../../application/providers/PasswordHasher'
import { AbstractRefreshTokenRepository } from '../../../../application/repositories/RefreshToken'
import { AbstractCustomerRepository } from '../../../../application/repositories/Customer'
import { AbstractSingInUseCase } from '../../../../application/useCases/auth/signIn/AbstractSingIn'
import { SignInUseCase } from '../../../../application/useCases/auth/signIn/SignIn'
import { AuthenticateUserController } from '../../../../presentation/http/controllers/Authenticate/AuthenticateUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { prismaClient } from '../../../databases/prisma/connection'
import { GenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { PasswordHasher } from '../../../providers/PasswordHasher'
import { PrismaRefreshTokenRepository } from '../../../repositories/PrismaRefreshToken'
import { PrismaCustomerRepository } from '../../../repositories/PrismaCustomer'

/**
 * Composer function for creating and configuring the components required for the user authentication flow.
 *
 * @function
 * @returns {IController} The configured authentication controller.
 */
export function authenticateUserComposer(): IController {
  const prismaCustomerRepository: AbstractCustomerRepository = new PrismaCustomerRepository(prismaClient)
  const refreshTokenRepository: AbstractRefreshTokenRepository =
    new PrismaRefreshTokenRepository(prismaClient)
  const passwordHasher: AbstractPasswordHasher = new PasswordHasher()
  const generateRefreshTokenProvider: AbstractGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider()
  const useCase: AbstractSingInUseCase = new SignInUseCase(
    prismaCustomerRepository,
    passwordHasher,
    generateRefreshTokenProvider,
    refreshTokenRepository,
  )
  const controller: IController = new AuthenticateUserController(useCase)
  return controller
}
