import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { url } from 'inspector';
import { PrismaService } from 'prisma/module/prisma.service';
import { ChangePhotoDto, CreatePhotoDto } from './dto/photo.dto';
import { S3Service } from './s3.service';
import { YandexStorageService } from './yandexs3.service';

@Injectable()
export class PhotoService {
  async changePhoto(photoId: number, user: User, changes: ChangePhotoDto) {
    console.log(changes);
    const photo = await this.prisma.photo.findUnique({
      where: {
        id: photoId,
      },
    });
    if (photo.authorId === user.id) {
      return await this.prisma.photo.update({
        where: {
          id: photoId,
        },
        data: changes,
      });
    } else {
      throw new UnauthorizedException('You are not the creator of this photo!');
    }
  }
  async deletePhoto(photoId: number, user: User) {
    const photo = await this.prisma.photo.findUnique({
      where: {
        id: photoId,
      },
    });
    if (photo.authorId === user.id) {
      return await this.prisma.photo.delete({
        where: {
          id: photoId,
        },
      });
    } else {
      throw new UnauthorizedException('You are not the creator of this photo!');
    }
  }
  async uploadPhotoWithLink(photo: CreatePhotoDto) {
    return await this.prisma.photo.create({
      data: {
        name: photo.name,
        description: photo.description,
        author: { connect: { id: photo.userId } },
        point: { connect: { id: photo.pointId } },
        s3Url: photo.S3Url,
      },
    });
  }
  async getPhotosFromPoint(pointId: number, limit: number, page: number) {
    return await this.prisma.$transaction([
      this.prisma.photo.count(),
      this.prisma.photo.findMany({
        where: {
          pointId: pointId,
        },
        orderBy: {
          timeCreated: 'desc',
        },
        skip: page,
        take: limit,
      }),
    ]);
  }
  async getPhoto(photoId: number) {
    return await this.prisma.photo.findUnique({
      where: { id: photoId },
    });
  }
  async uploadPhoto(file: Buffer, photo) {
    const key = await this.prisma.photo.create({
      data: {
        name: photo.name,
        description: photo.description,
        author: { connect: { id: photo.userId } },
        point: { connect: { id: photo.pointId } },
        s3Url: 'if you see this here that means some serious error happened. ',
      },
    });

    const urlRes = await this.yandexService.save(file);
    console.log('URLRES');
    console.log(urlRes);
    const obj = await this.prisma.photo.update({
      where: {
        id: key.id,
      },
      data: {
        s3Url: urlRes,
      },
    });
    console.log(obj);
    return 'photo succesfully uplaoded';
  }
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
    private yandexService: YandexStorageService,
  ) {}
}
