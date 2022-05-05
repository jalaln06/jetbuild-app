import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
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
import AuthUser from 'src/auth/auth-user.decorator';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { CreateProjectDto } from 'src/project/dto/project.dto';
import { ProjectService } from 'src/project/project.service';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/company.dto';
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
  @UseGuards(AuthGuard('jwt'))
  async CreateNewCompany(
    @Body() company: CreateCompanyDto,
    @AuthUser() user: User,
  ) {
    try {
      console.log(company);
      console.log(user);
      const comp = await this.companiesService.createCompany(company);
      await this.companiesService.asignUserToCompany(user.id, comp.id, 'OWNER');
    } catch (error) {}
  }
  @Get('/:companyId')
  @ApiOkResponse({
    description: 'returns company by Id',
  })
  @ApiOperation({ summary: 'Get company by Id' })
  @ApiBadRequestResponse({ description: 'Company not found' })
  GetCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
  ): Promise<Company> {
    try {
      return this.companiesService.getCompanyById(companyId);
    } catch (error) {}
  }
  @ApiOperation({ summary: 'assign user to company' })
  @ApiForbiddenResponse({ description: 'You have no rights to write here' })
  @ApiBadRequestResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'User not found' })
  @Post('/:companyId/user/:userId')
  addUserToCompany(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body('role') role: Role,
  ) {
    try {
      this.companiesService.asignUserToCompany(userId, companyId, 'WORKER');
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
  async deleteCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @AuthUser() user: User,
  ) {
    this.companiesService.deleteCompanyById(companyId, user);
  }
}
