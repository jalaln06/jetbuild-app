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
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';
import { cursorTo } from 'readline';
import AuthUser from 'src/auth/auth-user.decorator';
import { CompaniesService } from 'src/companies/companies.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { getUserCount } from 'supertokens-node';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from './dto/user.dto';
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
  @ApiQuery({ type: PaginationDTO })
  async getCompaniesList(
    @AuthUser() user: User,
    @Query('limit', ParseIntPipe) limit,
    @Query('page', ParseIntPipe) page,
  ) {
    return await this.companiesService.getCompanieslist(user.id, limit, page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.getUserById(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto);
  }
}
