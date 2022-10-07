import {
  ConflictException,
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
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  async activate(hashi: string): Promise<void> {
    const hashPair = await this.prismaService.hashes.findFirst({
      where: { hash: hashi },
    });
    console.log(hashPair);
    if (!hashPair) {
      throw new NotFoundException();
    }
    await this.prismaService.user.update({
      where: {
        email: hashPair.email,
      },
      data: {
        activated: true,
      },
    });
  }
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly mailService: MailService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { login, password } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: { login: loginDto.login },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.activated == false) {
      throw new UnauthorizedException('User is not activated');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      token: this.jwtService.sign({
        login,
      }),
      user,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const result = await this.prismaService.user.findUnique({
      where: { login: createUserDto.login },
    });
    if (result) {
      throw new ConflictException('Login already taken');
    }
    const eresult = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (eresult) {
      throw new ConflictException('Email already taken');
    }
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const user = await this.usersService.createUser(createUserDto);
    await this.prismaService.hashes.create({
      data: {
        email: user.email,
        hash: token,
      },
    });
    this.mailService.sendUserConfirmationSendGrid(user, token);
    return {
      token: this.jwtService.sign({ login: user.login }),
      user,
    };
  }
}
