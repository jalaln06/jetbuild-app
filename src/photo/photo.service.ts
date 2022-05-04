import { Injectable } from '@nestjs/common';
import { url } from 'inspector';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreatePhotoDto } from './dto/photo.dto';
import { S3Service } from './s3.service';

@Injectable()
export class PhotoService {
  async getPhotosFromPoint(pointId: number, limit: number, page: number) {
    return await this.prisma.photo.findMany({
      skip: page,
      take: limit,
      where: {
        pointId: pointId,
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
    const urlRes = await this.s3Service.uploadPhotoToS3(file, key.id);
    const obj = await this.prisma.photo.update({
      where: {
        id: key.id,
      },
      data: {
        s3Url: urlRes.Location,
      },
    });
    console.log(obj);
    return 'photo succesfully uplaoded';
  }
  constructor(private prisma: PrismaService, private s3Service: S3Service) {}
}
