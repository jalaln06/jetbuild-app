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
  ApiBearerAuth,
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
@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly companiesService: CompaniesService,
  ) {}

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
}
