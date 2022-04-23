import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, Prisma, Role } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: {
        login: data.login,
      },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    delete user.password;
    return user;
  }
  async getUser(login: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.password;
    return user;
  }
}
