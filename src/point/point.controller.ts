import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreatePhotoDto } from 'src/photo/dto/photo.dto';
import { PhotoService } from 'src/photo/photo.service';
import { CreatePointDto } from './dto/point.dto';
import { PointService } from './point.service';

@ApiTags('point')
@Controller('point')
export class PointController {
  constructor(
    readonly photoService: PhotoService,
    readonly pointService: PointService,
  ) {}
  @Get('/:pointId/photos')
  @ApiOperation({ summary: 'Take All Photos from one point' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  GetAllPhotosFromPoint(@Param('pointId') pointId: string) {
    throw new NotImplementedException();
  }
  @Post('/create')
  @ApiOperation({ summary: 'Create new point' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  CreateNewPoint(@Body() point: CreatePointDto) {
    this.pointService.createPoint(point);
  }
  @ApiOperation({ summary: 'upload photo' })
  @ApiCreatedResponse({ description: 'Photo Succesfully added' })
  @ApiBadRequestResponse({ description: 'Photo not working' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Post('/:pointId')
  uploadPhoto(
    @Body() photo: CreatePhotoDto,
    @Param('pointId') pointId: number,
  ) {
    throw new NotImplementedException();
  }
}
