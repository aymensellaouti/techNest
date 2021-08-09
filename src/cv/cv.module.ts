import { CacheModule, Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { CvListener } from './Listeners/cv.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvEntity]),
    UserModule,
    MailModule,
    CacheModule.register({

    })
  ],
  controllers: [CvController],
  providers: [CvService, CvListener]
})
export class CvModule {}
