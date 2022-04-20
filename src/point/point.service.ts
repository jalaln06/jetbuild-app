import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';

@Injectable()
export class PointService {
  constructor(private prisma: PrismaService) {}
  async createPoint(data: Prisma.PointCreateInput) {
    return this.prisma.point.create({
      data,
    });
  }
}
