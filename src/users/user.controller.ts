import {
  Controller,
  Get,
  Post,
  Body,
  NotImplementedException,
  Param,
  UseGuards,
  Session,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import AuthUser from 'src/auth/auth-user.decorator';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly companiesService: CompaniesService,
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
    try {
      this.userService.createUser(user);
    } catch (error) {}
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/companieslist')
  async getCompaniesList(@AuthUser() user: User) {
    return await this.companiesService.getCompanieslist(user.id);
  }

  @Get('/:userId/photos')
  @ApiOperation({ summary: 'Take All Photos from one user' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  async GetAllPhotosFromUser(@Param('userId') userId: number) {
    throw new NotImplementedException();
  }
  @Get('/:login')
  @ApiOperation({ summary: 'Get User info' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  async GetUser(@Param('login') login: string) {
    return this.userService.getUser(login);
  }
}
