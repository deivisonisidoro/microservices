import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerMiddleware } from '../middlewares/ensureAuthenticated';
import { AuthModule } from './auth.module';
import { CustomersModule } from './customers.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    CustomersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'customers', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('customers', 'auth');
  }
}
