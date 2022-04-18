import {
  Controller,
  Get,
  Post,
  Body,
  NotImplementedException,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaService } from 'prisma/module/prisma.service';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'login user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
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
  @Get('/:userId/photos')
  @ApiOperation({ summary: 'Take All Photos from one user' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  async GetAllPhotosFromUser(@Param('userId') userId: string) {
    throw new NotImplementedException();
  }
}
