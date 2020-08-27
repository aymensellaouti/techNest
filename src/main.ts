import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

import { DurationInterceptor } from './interceptors/duration.interceptor';
import { ConfigService } from '@nestjs/config';


dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOptions = {
    origin: ['http://localhost:4200']
  }
  app.enableCors(corsOptions);
  app.use(morgan('dev'));
  app.use(
    (req: Request, res: Response, next) => {
      console.log('Middelware from app.use');
      next();
    }
  )
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  app.useGlobalInterceptors(new DurationInterceptor());
  console.log('port : ', configService.get('port'));
  await app.listen(configService.get('port'));
}
bootstrap();
