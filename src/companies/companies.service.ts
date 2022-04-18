import { Injectable } from '@nestjs/common';
import { Company, Prisma, Role } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async createCompany(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({
      data,
    });
  }
}
