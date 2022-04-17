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
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PhotosService as PhotoService } from 'src/photo/photos.service';
import { CreatePointDto } from './dto/point.dto';

@ApiTags('point')
@Controller('point')
export class PointController {
  constructor(readonly photoService: PhotoService) {}
  @Get('/:pointId/photos')
  @ApiOperation({ summary: 'Take All Photos from one point' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  GetAllPhotosFromPoint(@Param('pointId') pointId: string) {
    throw new NotImplementedException();
  }
  @Post('')
  @ApiOperation({ summary: 'Create new point' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  CreateNewPoint(@Body() point: CreatePointDto) {
    throw new NotImplementedException();
  }
}
