import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CvEntity])],
  controllers: [CvController],
  providers: [CvService]
})
export class CvModule {}
