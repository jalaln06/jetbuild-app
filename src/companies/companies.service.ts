import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company, Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CompaniesService {
  async deleteCompanyById(companyId: number, user: User) {
    throw new Error('Method not implemented.');
    this.checkOwnership(companyId, user);
  }
  async checkOwnership(companyId: number, user: User) {
    const userId = user.id;
    const rel = await this.prisma.usersOnCompanies.findUnique({
      where: {
        userId_companyId: { companyId, userId },
      },
    });
    if (!rel) {
      throw new NotFoundException();
    }
    return rel.role === 'OWNER';
  }
  async getCompanieslist(id: number, limit: number, page: number) {
    return await this.prisma.$transaction([
      this.prisma.company.count(),
      this.prisma.company.findMany({
        skip: page,
        take: limit,
        where: {
          users: {
            some: {
              userId: id,
            },
          },
        },
      }),
    ]);
  }
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
  async getCompaniesIdsByUserId(userId: number) {
    const result = await this.prisma.usersOnCompanies.findMany({
      where: { userId: userId },
      select: { companyId: true },
    });
    if (!result) {
      throw new NotFoundException("error User don't have companies");
    }
    return await result;
  }
}
