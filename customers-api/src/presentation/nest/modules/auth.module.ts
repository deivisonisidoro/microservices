import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AbstractGenerateRefreshTokenProvider } from '../../../application/providers/GenerateRefreshToken';
import { AbstractKafkaProducer } from '../../../application/providers/kafka/producer';
import { AbstractPasswordHasher } from '../../../application/providers/PasswordHasher';
import { AbstractTokenManagerProvider } from '../../../application/providers/TokenMagerProvider';
import { AbstractCustomerRepository } from '../../../application/repositories/Customer';
import { AbstractRefreshTokenRepository } from '../../../application/repositories/RefreshToken';
import { PrismaService } from '../../../infra/database/nestPrisma/prisma.service';
import { GenerateRefreshTokenProvider } from '../../../infra/providers/GenerateRefreshToken';
import { KafkaProducer } from '../../../infra/providers/kafka/producer';
import { PasswordHasher } from '../../../infra/providers/PasswordHasher';
import { TokenManagerProvider } from '../../../infra/providers/TokenManager';
import { PrismaCustomerRepository } from '../../../infra/repositories/PrismaCustomer';
import { PrismaRefreshTokenRepository } from '../../../infra/repositories/PrismaRefreshToken';
import { AuthController } from '../controllers/auth/Auth';
import { AbstractAuthManager } from '../managers/Auth';
import { AbstractCustomerManager } from '../managers/Customer';
import { AuthManager } from '../managers/implementations/Auth';
import { CustomerManager } from '../managers/implementations/Customer';
import { CustomersModule } from './customers.module';

@Module({
  imports: [
    CustomersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    {
      provide: AbstractCustomerManager,
      useClass: CustomerManager,
    },
    {
      provide: AbstractAuthManager,
      useClass: AuthManager,
    },
    {
      provide: AbstractCustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: AbstractPasswordHasher,
      useClass: PasswordHasher,
    },
    {
      provide: AbstractGenerateRefreshTokenProvider,
      useClass: GenerateRefreshTokenProvider,
    },
    {
      provide: AbstractRefreshTokenRepository,
      useClass: PrismaRefreshTokenRepository,
    },
    {
      provide: AbstractTokenManagerProvider,
      useClass: TokenManagerProvider,
    },
    {
      provide: AbstractKafkaProducer,
      useClass: KafkaProducer,
    },
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
