import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService as PhotoService } from './photo.service';

@Module({
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
