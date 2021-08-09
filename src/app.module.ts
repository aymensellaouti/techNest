import { CacheInterceptor, CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first.middleware';
import { logger } from './middlewares/Logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';

import appConfig from './config/app.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',//process.env.DB_HOST,
      port: 3306, //parseInt(process.env.DB_PORT),
      username: 'root', //process.env.DB_USERNAME,
      password: '',// process.env.DB_PASSWORD,
      database: 'nest-cvtech',//process.env.DB_NAME,
      autoLoadEntities: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      debug: false
    }),
    CvModule,
    UserModule,
    EventEmitterModule.forRoot(),
    MailModule,
    CacheModule.register({

    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
  exports: [AppService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirstMiddleware).forRoutes('hello',
      {path: 'todo', method: RequestMethod.GET},
      {path: 'todo*', method: RequestMethod.DELETE},
    )
      .apply(logger).forRoutes('')
      .apply(HelmetMiddleware).forRoutes('')
    ;
  }
}
