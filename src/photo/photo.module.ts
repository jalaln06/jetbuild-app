import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotosService } from './photos.service';

@Module({
  controllers: [PhotoController],
  providers: [PhotosService],
  exports: [PhotosService],
})
export class PhotoModule {}
