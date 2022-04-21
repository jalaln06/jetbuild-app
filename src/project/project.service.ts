import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
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
  async getAllProjectsFromCompany(companyId: number) {
    return await this.prisma.project.findMany({
      where: {
        companyId: companyId,
      },
    });
  }
}
