import { Module } from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { S3Service } from 'src/photo/s3.service';
import { PrismaModule } from 'prisma/module/prisma.module';
import { PointController } from './point.controller';
import { PointService } from './point.service';

@Module({
  imports: [PrismaModule],
  controllers: [PointController],
  providers: [PointService, PhotoService, S3Service, PrismaModule],
  exports: [PointService],
})
export class PointModule {}
