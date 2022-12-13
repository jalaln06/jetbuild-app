import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiHideProperty,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role, User, Company, prisma } from '@prisma/client';
import { use } from 'passport';
import AuthUser from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateProjectDto } from 'src/project/dto/project.dto';
import { ProjectService } from 'src/project/project.service';
import { getSystemErrorMap } from 'util';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
@ApiBearerAuth()
@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private companiesService: CompaniesService,
    private projectService: ProjectService,
  ) {}
  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create new company' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  async CreateNewCompany(
    @Body() company: CreateCompanyDto,
    @AuthUser() user: User,
  ) {
    try {
      const comp = await this.companiesService.createCompany(company);
      await this.companiesService.asignUserToCompany(
        user.email,
        comp.id,
        'OWNER',
      );
    } catch (error) {}
  }
  @Put('/:companyId')
  @ApiOkResponse({
    description: 'Company Updated succesfully',
  })
  @ApiOperation({
    summary: 'Update company by UpdateCompanyDTO',
  })
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.OWNER, Role.MANAGER)
  async UpdateCompany(
    @Body() company: UpdateCompanyDto,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return await this.companiesService.updateCompanyById(companyId, company);
  }

  @Get('/:companyId')
  @ApiOkResponse({
    description: 'returns company by Id',
  })
  @ApiOperation({ summary: 'Get company by Id' })
  @ApiBadRequestResponse({ description: 'Company not found' })
  async GetCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
  ): Promise<Company> {
    try {
      return await this.companiesService.getCompanyById(companyId);
    } catch (error) {}
  }
  @ApiOperation({ summary: 'assign user to company' })
  @ApiForbiddenResponse({ description: 'You have no rights to write here' })
  @ApiBadRequestResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'User not found' })
  @Roles(Role.OWNER, Role.MANAGER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/:companyId/user/:userEmail')
  addUserToCompany(
    @Param('userEmail') userEmail: string,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body('role') role: Role,
  ) {
    try {
      this.companiesService.asignUserToCompany(userEmail, companyId, 'WORKER');
    } catch (error) {}
  }
  @Post('/:companyId/project')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create new project' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  @Roles(Role.OWNER, Role.MANAGER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async CreateNewProject(
    @Body() project: CreateProjectDto,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    try {
      return await this.projectService.createProject(project, companyId);
    } catch (error) {}
  }
  @Get('/:companyId/projects')
  @ApiOperation({ summary: 'Get all projects from company' })
  @ApiQuery({ type: PaginationDTO })
  @ApiBadRequestResponse({ description: 'No such company' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async GetAllProjectsFromCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Query('limit', ParseIntPipe) limit,
    @Query('page', ParseIntPipe) page,
  ) {
    return await this.projectService.getAllProjectsFromCompany(
      companyId,
      limit,
      page,
    );
  }
  @ApiHideProperty()
  @Delete('/:companyId')
  @Roles(Role.OWNER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @AuthUser() user: User,
  ) {
    this.companiesService.deleteCompanyById(companyId, user);
  }
  @Get('/:companyId/users')
  async getAllUsersFromCompanu(
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return await this.companiesService.getUsersByCompanyId(companyId);
  }
  @ApiOperation({ summary: 'invite user to company' })
  @ApiForbiddenResponse({ description: 'You have no rights to write here' })
  @ApiBadRequestResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'User not found' })
  @Roles(Role.OWNER, Role.MANAGER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/:companyId/user/:userEmail')
  inviteUserToCompany(
    @Param('userEmail') userEmail: string,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body('role') role: Role,
  ) {
    try {
      console.log(userEmail);
      this.companiesService.inviteUserToCompany(userEmail, companyId);
    } catch (error) {}
  }
}
