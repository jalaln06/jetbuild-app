import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreatePointDto, UpdatePointtDto } from './dto/point.dto';

@Injectable()
export class PointService {
  async changeState(pointId: number, data: UpdatePointtDto) {
    try {
      await this.prisma.point.update({
        where: {
          id: pointId,
        },
        data: { stage: data.stage },
      });
    } catch (error) {
      throw error;
    }
  }
  async deletePoint(pointId: number) {
    return await this.prisma.point.delete({
      where: {
        id: pointId,
      },
    });
  }
  async getPointsFromProject(projectId: number, limit: number, page: number) {
    const proj = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!proj) {
      throw new BadRequestException('Project not found');
    }
    return await this.prisma.$transaction([
      this.prisma.point.count({
        where: {
          projectId: projectId,
        },
      }),
      this.prisma.point.findMany({
        skip: page,
        take: limit,
        where: {
          projectId: projectId,
        },
      }),
    ]);
  }
  constructor(private prisma: PrismaService) {}
  async createPoint(data: CreatePointDto) {
    console.log(data);
    return await this.prisma.point.create({
      data,
    });
  }
}
