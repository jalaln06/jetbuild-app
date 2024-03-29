import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateCompanyDto } from 'src/companies/dto/company.dto';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreatePhotoDto } from 'src/photo/dto/photo.dto';
import { PhotoService } from 'src/photo/photo.service';
import { S3Service } from 'src/photo/s3.service';
import { CreatePointDto, UpdatePointtDto } from './dto/point.dto';
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
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Take All Photos from one point' })
  @ApiQuery({ type: PaginationDTO })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({ description: 'Returns array of points' })
  @ApiBadRequestResponse({ description: 'Photos not found' })
  async GetAllPhotosFromPoint(
    @Param('pointId', ParseIntPipe) pointId: number,
    @Query('limit', ParseIntPipe) limit,
    @Query('page', ParseIntPipe) page,
  ) {
    return await this.photoService.getPhotosFromPoint(pointId, limit, page);
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
  @Delete('/:pointId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: ' Delete point' })
  async deletePoint(@Param('pointId', ParseIntPipe) pointId: number) {
    return await this.pointService.deletePoint(pointId);
  }

  @Post('uploadfake')
  @UseGuards(AuthGuard('jwt'))
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
  async uploadFileFake(
    @UploadedFile() file: Buffer,
    @Body() data: CreatePhotoDto,
  ) {
    return await this.photoService.uploadPhoto(file, data);
  }

  @UseGuards(AuthGuard('jwt'))
  async uploadFile(@Body() data: CreatePhotoDto) {
    return await this.photoService.uploadPhotoWithLink(data);
  }
  @Patch('/:pointId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Project' })
  @Roles(Role.OWNER, Role.MANAGER)
  ChangeState(
    @Param('pointId', ParseIntPipe) pointId: number,
    @Body() data: UpdatePointtDto,
  ) {
    return this.pointService.changeState(pointId, data);
  }
}
