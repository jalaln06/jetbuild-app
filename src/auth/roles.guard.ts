import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaClient, Role, User } from '@prisma/client';
import { user_FirstName } from 'aws-sdk/clients/alexaforbusiness';
import { PrismaService } from 'prisma/module/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const companyId = parseInt(request.params.companyId);
    return await this.matchRoles(roles, user.id, companyId);
  }

  async matchRoles(
    roles: string[],
    userId: number,
    companyId: number,
  ): Promise<boolean> {
    try {
      const rel = await this.prismaService.usersOnCompanies.findUnique({
        where: {
          userId_companyId: { companyId, userId },
        },
      });
      for (const role of roles) {
        if (rel.role === role) {
          return true;
        }
      }
    } catch (e) {
      throw new HttpException('Some mistake happened', HttpStatus.BAD_REQUEST);
    }
    return false;
  }
}
