import { Module } from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { PointController } from './point.controller';
import { PointService } from './point.service';

@Module({
  controllers: [PointController],
  providers: [PointService, PhotoService],
  exports: [PointService],
})
export class PointModule {}
