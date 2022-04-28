import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreatePointDto } from './dto/point.dto';

@Injectable()
export class PointService {
  async getPointsFromProject(projectId: number) {
    const proj = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!proj) {
      throw new BadRequestException('Project not found');
    }
    return await this.prisma.point.findMany({
      where: {
        projectId: projectId,
      },
    });
  }
  constructor(private prisma: PrismaService) {}
  async createPoint(data: CreatePointDto) {
    console.log(data);
    return await this.prisma.point.create({
      data,
    });
  }
}
