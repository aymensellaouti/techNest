import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';

@Module({
  controllers: [CvController],
  providers: [CvService]
})
export class CvModule {}
