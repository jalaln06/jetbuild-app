import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { InstanceLoader } from '@nestjs/core/injector/instance-loader';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PhotoService } from './photo.service';

@ApiTags('photos')
@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}
  @ApiOperation({ summary: 'get photo by id' })
  @ApiBadRequestResponse({ description: 'Photo not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('/:photoId')
  getPhoto(@Param('photoId') photoId: string) {
    throw NotImplementedException;
  }
}
