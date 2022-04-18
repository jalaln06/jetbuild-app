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
import { CreateProjectDto } from './dto/project.dto';

@ApiTags('projects')
@Controller('project')
export class ProjectController {
  @Get('/:companyId')
  getProjectsByCompanyId() {
    throw new NotImplementedException();
  }
  @Post('')
  @ApiOperation({ summary: 'Create new point' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  CreateNewProject(@Body() point: CreateProjectDto) {
    throw new NotImplementedException();
  }
  @Post('/:projectId/user/:userId')
  @ApiOperation({ summary: 'assign user to company' })
  @ApiForbiddenResponse({ description: 'You have no rights to write here' })
  @ApiBadRequestResponse({ description: 'Project not found' })
  @ApiBadRequestResponse({ description: 'User not found' })
  addUserToProject(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
  ) {
    throw new NotImplementedException();
  }
  @Get('/:projectId/photos')
  @ApiOperation({ summary: 'Take All Photos from one project' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  GetAllPhotosFromProject(@Param('projectId') projectId: string) {
    throw new NotImplementedException();
  }
}
