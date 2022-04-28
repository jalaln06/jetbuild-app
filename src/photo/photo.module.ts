import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/module/prisma.module';
import { PhotoController } from './photo.controller';
import { PhotoService as PhotoService } from './photo.service';
import { S3Service } from './s3.service';

@Module({
  imports: [PrismaModule],
  controllers: [PhotoController],
  providers: [PhotoService, S3Service],
  exports: [PhotoService],
})
export class PhotoModule {}
