import { Module } from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { S3Service } from 'src/photo/s3.service';
import { PrismaModule } from 'prisma/module/prisma.module';
import { PointController } from './point.controller';
import { PointService } from './point.service';
import { YandexStorageService } from 'src/photo/yandexs3.service';

@Module({
  imports: [PrismaModule],
  controllers: [PointController],
  providers: [PointService, PhotoService, S3Service, YandexStorageService],
  exports: [PointService],
})
export class PointModule {}
