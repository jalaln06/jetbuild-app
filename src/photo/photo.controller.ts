import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InstanceLoader } from '@nestjs/core/injector/instance-loader';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePhotoDto } from './dto/photo.dto';
import { PhotoService } from './photo.service';
import { S3Service } from './s3.service';
@ApiBearerAuth()
@ApiTags('photos')
@Controller('photo')
export class PhotoController {
  constructor(
    private photoService: PhotoService,
    private s3Service: S3Service,
  ) {}
  @ApiOperation({ summary: 'get photo by id' })
  @ApiBadRequestResponse({ description: 'Photo not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('/:photoId')
  async getPhoto(@Param('photoId', ParseIntPipe) photoId: number) {
    return await this.photoService.getPhoto(photoId);
  }
}
