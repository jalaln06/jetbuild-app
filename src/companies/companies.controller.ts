import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role, User, Company, prisma } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';
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
  @Get('/:companyId/photos')
  @ApiOperation({ summary: 'Take All Photos from one company' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  GetAllPhotosFromCompany(@Param('companyId', ParseIntPipe) companyId: number) {
    throw new NotImplementedException();
  }
  @Get('/:companyId/projects')
  @ApiOperation({ summary: 'Get all projects from company' })
  @ApiBadRequestResponse({ description: 'No such company' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async GetAllProjectsFromCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return await this.projectService.getAllProjectsFromCompany(companyId);
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
