import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/module/prisma.service';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './dto/auth-response.dto';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UserService } from 'src/users/user.service';
import { prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { username, password } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: { login: loginDto.username },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException('invalid password');
    }

    return {
      token: this.jwtService.sign({
        username,
      }),
      user,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const result = await this.prismaService.user.findUnique({
      where: { login: createUserDto.login },
    });
    if (result) {
      throw new NotFoundException('login already taken');
    }
    const eresult = await this.prismaService.user.findUnique({
      where: { login: createUserDto.login },
    });

    if (eresult) {
      throw new NotFoundException('email already taken');
    }

    const user = await this.usersService.createUser(createUserDto);
    return {
      token: this.jwtService.sign({ login: user.login }),
      user,
    };
  }
}
