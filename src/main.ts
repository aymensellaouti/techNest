import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

import { DurationInterceptor } from './interceptors/duration.interceptor';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOptions = {
    origin: [
      'http://localhost:4200',
      'https://aymensellaouti.github.io'
    ]
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
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));
  // console.log('port : ', configService.get('port'));
  const options = new DocumentBuilder()
    .setTitle('CvTech')
    .setDescription('CvTech application wuth Techwall')
    .setVersion('1.0')
    .addTag('cv')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  //configService.get('port') ||
  await app.listen( process.env.PORT || 3000);
}
bootstrap();
