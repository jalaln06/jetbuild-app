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
import { CreatePhotoDto } from './dto/photo.dto';
import { PhotosService } from './photos.service';

@ApiTags('photos')
@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotosService) {}
  @ApiOperation({ summary: 'upload photo' })
  @ApiBadRequestResponse({ description: 'Photo did not load' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Post('/:pointId')
  uploadPhoto(@Body() photo: CreatePhotoDto) {
    throw NotImplementedException;
  }
  @ApiOperation({ summary: 'get photo by id' })
  @ApiBadRequestResponse({ description: 'Photo not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('/:photoId')
  getPhoto(@Param('photoId') photoId: string) {
    throw NotImplementedException;
  }
  @ApiOperation({ summary: 'get all photos from user' })
  @ApiBadRequestResponse({ description: 'No photos from user' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('/:userId')
  getAllPhotosByUser(@Param('userId') userId: string) {
    throw NotImplementedException;
  }
  @ApiOperation({ summary: 'get all photos from company' })
  @ApiBadRequestResponse({ description: 'No photos from company' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('/:companyId')
  getAllPhotosByCompany(@Param('companyId') companyId: string) {
    throw NotImplementedException;
  }

  @ApiOperation({ summary: 'get photos by project' })
  @ApiBadRequestResponse({ description: 'Photos not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('/:projectId')
  getAllPhotosByProject(@Param('projectId') projectId: string) {
    throw NotImplementedException;
  }

  @ApiOperation({ summary: 'get photos by Point' })
  @ApiBadRequestResponse({ description: 'Photos not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('/:pointId')
  getAllPhotosByPoint(@Param('pointId') pointId: string) {
    throw NotImplementedException;
  }
}
