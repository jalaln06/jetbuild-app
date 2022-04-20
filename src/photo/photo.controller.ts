import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InstanceLoader } from '@nestjs/core/injector/instance-loader';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PhotoService } from './photo.service';
import { S3Service } from './s3.service';

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
  getPhoto(@Param('photoId') photoId: string) {
    throw new NotImplementedException();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          // 👈 this property
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.s3Service.uploadPhoto(file.buffer);
  }
}
