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
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InstanceLoader } from '@nestjs/core/injector/instance-loader';
import { AuthGuard } from '@nestjs/passport';
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
import { User } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';
import { ChangePhotoDto, CreatePhotoDto } from './dto/photo.dto';
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBadRequestResponse({ description: 'Photo not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('/:photoId')
  async getPhoto(@Param('photoId', ParseIntPipe) photoId: number) {
    return await this.photoService.getPhoto(photoId);
  }
  @ApiOperation({ summary: 'delete photo by id' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBadRequestResponse({ description: 'Photo not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Delete('/:photoId')
  async deletePhoto(
    @Param('photoId', ParseIntPipe) photoId: number,
    @AuthUser() user: User,
  ) {
    return await this.photoService.deletePhoto(photoId, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('/:photoId')
  async changePhoto(
    @Param('photoId', ParseIntPipe) photoId: number,
    @AuthUser() user: User,
    @Body() data: ChangePhotoDto,
  ) {
    console.log(data);
    return await this.photoService.changePhoto(photoId, user, data);
  }
}
