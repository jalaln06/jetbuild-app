import { Module } from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { S3Service } from 'src/photo/s3.service';
import { PointController } from './point.controller';
import { PointService } from './point.service';

@Module({
  controllers: [PointController],
  providers: [PointService, PhotoService, S3Service],
  exports: [PointService],
})
export class PointModule {}
