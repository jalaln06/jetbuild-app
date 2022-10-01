import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, Prisma, Role } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async update(userId: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto,
    });
  }
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
  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.password;
    return user;
  }
}
