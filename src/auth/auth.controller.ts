import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { User } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/user.dto';
import AuthUser from './auth-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getLoggedUser(@AuthUser() user: User): User {
    return user;
  }
}
