import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { ProjectService } from 'src/project/project.service';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private companiesService: CompaniesService,
    private projectService: ProjectService,
  ) {}
  @Post('')
  @ApiOperation({ summary: 'Create new company' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  async CreateNewCompany(@Body() company: CreateCompanyDto) {
    try {
      const comp = await this.companiesService.createCompany(company);
      this.companiesService.asignUserToCompany(1, comp.id, 'OWNER');
    } catch (error) {}
  }
  @Get('/:companyId')
  @ApiOperation({ summary: 'Get company by Id' })
  @ApiBadRequestResponse({ description: 'Company not found' })
  GetCompany(@Param('companyId', ParseIntPipe) companyId: number) {
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
    console.log(await this.projectService.getAllProjectsFromCompany(companyId));
  }
}
