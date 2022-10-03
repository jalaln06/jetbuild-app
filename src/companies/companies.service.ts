import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company, Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { NotFoundError } from 'rxjs';
import { UpdateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  inviteUserToCompany(userEmail: string, companyId: number) {
    throw new Error('Method not implemented.');
  }
  async updateCompanyById(companyId: number, data: Prisma.CompanyUpdateInput) {
    return await this.prisma.company.update({
      where: { id: companyId },
      data,
    });
  }
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
      this.prisma.company.count({
        where: {
          users: {
            some: {
              userId: id,
            },
          },
        },
      }),
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
  async asignUserToCompany(userEmail: string, companyId: number, Role: Role) {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (user == null) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });
    if (company == null) {
      throw new HttpException('Company not Found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.prisma.usersOnCompanies.create({
        data: {
          userId: user.id,
          companyId: companyId,
          role: Role,
        },
      });
    } catch (e) {
      throw new HttpException(
        'User already assigned to company',
        HttpStatus.BAD_REQUEST,
      );
    }
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
  async getUsersByCompanyId(companyId: number) {
    const res = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: {
        users: {
          include: { user: true },
          orderBy: {
            user: {
              timeCreated: 'desc',
            },
          },
        },
      },
    });
    res.users.forEach(async (user) => {
      this.exclude(user.user, 'password');
    });
    return res;
  }
  exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }
}
