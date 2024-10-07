import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { AppModule } from './src/presentation/nest/modules/app.module';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Title Documentation')
    .setDescription('Description Documentation')
    .setVersion('1.0.0')
    .addTag('Auth')
    .addTag('Customers')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}

bootstrap();
