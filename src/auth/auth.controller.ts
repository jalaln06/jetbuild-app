import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { User } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/user.dto';
import AuthUser from './auth-user.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}
  @ApiOperation({ summary: 'login user' })
  @ApiResponse({
    status: 200,
    description: 'Succesfully logged in',
  })
  @ApiBadRequestResponse({ description: 'User or Password not found' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    console.log(loginDto);
    return await this.authService.login(loginDto);
  }
  @ApiOperation({ summary: 'activate user' })
  @ApiBadRequestResponse({ description: 'User or Password not found' })
  @Get('/activate/:hash')
  async activate(@Param('hash') hash: string): Promise<void> {
    console.log(hash);
    return await this.authService.activate(hash);
  }
  @ApiOperation({ summary: 'register user' })
  @ApiConflictResponse({ description: 'User already exists' })
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    console.log(createUserDto);
    return await this.authService.register(createUserDto);
  }
}
