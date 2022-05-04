import { Injectable } from '@nestjs/common';
import { url } from 'inspector';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreatePhotoDto } from './dto/photo.dto';
import { S3Service } from './s3.service';
import { YandexStorageService } from './yandexs3.service';

@Injectable()
export class PhotoService {
  async getPhotosFromPoint(pointId: number, limit: number, page: number) {
    return await this.prisma.photo.findMany({
      skip: page,
      take: limit,
      where: {
        pointId: pointId,
      },
      orderBy: {
        timeCreated: 'desc',
      },
    });
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
