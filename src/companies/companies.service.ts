import { Injectable } from '@nestjs/common';
import { Company, Prisma, Role, User } from '@prisma/client';
import { id } from 'aws-sdk/clients/datapipeline';
import { PrismaService } from 'prisma/module/prisma.service';
import { combineAll } from 'rxjs';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async createCompany(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({
      data,
    });
  }
  async getCompanyByUserId(userId: number): Promise<Company> {
    const companyId = this.getCompaniesIdFromUser(userId);
    return this.getCompanyById(await companyId);
  }

  async getCompaniesIdFromUser(id: number): Promise<number> {
    const _id = await this.prisma.usersOnCompanies.findFirst({
      where: {
        userId: id,
      },
      select: {
        companyId: true,
      },
    });
    return _id.companyId;
  }

  async getCompanyById(companyId: number): Promise<Company> {
    return this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });
  }
}
