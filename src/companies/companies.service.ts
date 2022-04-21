import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Company, Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';

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
  async asignUserToCompany(userId: number, companyId: number, Role: Role) {
    console.log(userId, companyId, Role);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });
    if (company == null) {
      throw new HttpException('Company not Found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.usersOnCompanies.create({
      data: { userId: userId, companyId: companyId, role: Role },
    });
  }
}
