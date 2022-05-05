import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { take } from 'rxjs';
import { CreateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(dto: CreateProjectDto, id: number): Promise<Project> {
    const createProject = await this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        companyId: id,
      },
    });
    return createProject;
  }
  async getAllProjectsFromCompany(
    companyId: number,
    limit: number,
    page: number,
  ) {
    return await this.prisma.$transaction([
      this.prisma.project.count({
        where: {
          companyId: companyId,
        },
      }),
      this.prisma.project.findMany({
        skip: page,
        take: limit,
        where: {
          companyId: companyId,
        },
      }),
    ]);
  }
}
