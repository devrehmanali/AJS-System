import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { mongooseFilter } from '@filters/mongoose.filter';
import * as cookieParser from 'cookie-parser';
import {json} from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: '*',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new mongooseFilter());
  app.use(cookieParser());
  app.use(json({limit: '50mb'}))
  const port = process.env.PORT || 8080;

  app.enableVersioning({
    defaultVersion: ['1'],
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Backend AJS NestJS')
    .setDescription('API description v1')
    .setVersion('1.0')
    .addTag('NestJS')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://localhost:${port}/api`,
    );
  });
}
bootstrap();
