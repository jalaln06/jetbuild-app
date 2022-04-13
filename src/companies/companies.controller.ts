import {
  Body,
  Controller,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from './dto/company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  @ApiOperation({ summary: 'CreateCompany' })
  @ApiBadRequestResponse({ description: 'Company Already exists' })
  @Post('')
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    throw NotImplementedException;
  }
  @ApiOperation({ summary: 'assign user to company' })
  @ApiBadRequestResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'User not found' })
  @Post('/:userId')
  addUserToCompany(@Param('userId') userId: string) {
    throw NotImplementedException;
  }
}
