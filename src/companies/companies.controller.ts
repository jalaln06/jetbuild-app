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
import { CreateCompanyDto } from './dto/company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  @Post('')
  @ApiOperation({ summary: 'Create new point' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  CreateNewCompany(@Body() point: CreateCompanyDto) {
    throw new NotImplementedException();
  }
  @ApiOperation({ summary: 'assign user to company' })
  @ApiForbiddenResponse({ description: 'You have no rights to write here' })
  @ApiBadRequestResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'User not found' })
  @Post('/:companyId/user/:userId')
  addUserToCompany(
    @Param('userId') userId: string,
    @Param('companyId') companyId: string,
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
}
