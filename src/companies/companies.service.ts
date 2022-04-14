import { Injectable } from '@nestjs/common';
import { Company, Prisma, Role } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class CompaniesService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createCompany(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({
      data,
    });
  }
  async assignCompanyOwner(
    companyId: number,
    userId: number,
  ): Promise<Company> {
    this.userService.assignRole(userId, Role.OWNER);
    return this.prisma.company.update({
      where: { id: companyId },
      data: {
        owner: { connect: { id: userId } },
      },
    });
  }
}
