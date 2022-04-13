import {
  Controller,
  Get,
  Post,
  Body,
  NotImplementedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'login user' })
  @ApiBadRequestResponse({ description: 'User or Passwowrd not found' })
  @Post('/login')
  async loginUser(@Body() user: UserLoginDto) {
    throw new NotImplementedException();
  }
  @ApiOperation({ summary: 'register user' })
  @ApiConflictResponse({ description: 'User already exists' })
  @Post('/reguser')
  async createUser(@Body() user: CreateUserDto) {
    throw new NotImplementedException();
  }
}
