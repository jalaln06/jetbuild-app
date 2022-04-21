import { Body, Injectable } from '@nestjs/common';
import { User, Prisma, Role } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data,
    });
  }
  async findUser(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        login: username,
      },
    });
  }
}
