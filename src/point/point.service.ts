import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreatePointDto } from './dto/point.dto';

@Injectable()
export class PointService {
  constructor(private prisma: PrismaService) {}
  async createPoint(data: CreatePointDto) {
    return this.prisma.point.create({
      data,
    });
  }
}
