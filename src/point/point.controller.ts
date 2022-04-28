import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreateCompanyDto } from 'src/companies/dto/company.dto';
import { CreatePhotoDto } from 'src/photo/dto/photo.dto';
import { PhotoService } from 'src/photo/photo.service';
import { S3Service } from 'src/photo/s3.service';
import { CreatePointDto } from './dto/point.dto';
import { PointService } from './point.service';
@ApiBearerAuth()
@ApiTags('point')
@Controller('point')
export class PointController {
  constructor(
    readonly photoService: PhotoService,
    readonly pointService: PointService,
    readonly s3Service: S3Service,
    readonly prisma: PrismaService,
  ) {}
  @Get('/:pointId/photos')
  @ApiOperation({ summary: 'Take All Photos from one point' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  async GetAllPhotosFromPoint(@Param('pointId', ParseIntPipe) pointId: number) {
    return await this.photoService.getPhotosFromPoint(pointId);
  }
  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create new point' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  async CreateNewPoint(@Body() point: CreatePointDto) {
    console.log(point);
    return await this.pointService.createPoint(point);
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
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        userId: {
          type: 'number',
        },
        pointId: {
          type: 'number',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Buffer, @Body() data: CreatePhotoDto) {
    console.log(file);
    //this.photoService.uploadPhoto(file, data);
  }
}
