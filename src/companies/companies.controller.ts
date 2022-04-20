import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}
  @Post('')
  @ApiOperation({ summary: 'Create new point' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  CreateNewCompany(@Body() company: CreateCompanyDto) {
    try {
      return this.companiesService.createCompany(company);
    } catch (error) {}
  }
  @Get('/:companyId')
  @ApiOperation({ summary: 'Get company by Id' })
  @ApiBadRequestResponse({ description: 'Company not found' })
  GetCompany(@Param('companyId') companyId: number) {
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
    @Param('userId') userId: number,
    @Param('companyId') companyId: number,
  ) {
    throw new NotImplementedException();
  }
  @Get('/:companyId/photos')
  @ApiOperation({ summary: 'Take All Photos from one company' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  GetAllPhotosFromCompany(@Param('companyId') companyId: string) {
    throw new NotImplementedException();
  }
  @Get('/:companyId/projects')
  @ApiOperation({ summary: 'Get all projects from company' })
  GetAllProjectsFromCompany() {
    throw new NotImplementedException();
  }
}
