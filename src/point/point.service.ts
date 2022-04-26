import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreatePointDto } from './dto/point.dto';

@Injectable()
export class PointService {
  async getPointsFromProject(projectId: number) {
    return await this.prisma.point.findMany({
      where: {
        projectId: projectId,
      },
    });
  }
  constructor(private prisma: PrismaService) {}
  async createPoint(data: CreatePointDto) {
    return await this.prisma.point.create({
      data,
    });
  }
}
