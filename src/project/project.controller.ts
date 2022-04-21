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
import { CreateProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@ApiTags('projects')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Post('/:companyId')
  @ApiOperation({ summary: 'Create new project' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'wrong parameters' })
  CreateNewProject(
    @Body() project: CreateProjectDto,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    try {
      this.projectService.createProject(project, companyId);
    } catch (error) {}
  }
  @Post('/:projectId/user/:userId')
  @ApiOperation({ summary: 'assign user to project' })
  @ApiForbiddenResponse({ description: 'You have no rights to write here' })
  @ApiBadRequestResponse({ description: 'Project not found' })
  @ApiBadRequestResponse({ description: 'User not found' })
  addUserToProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    throw new NotImplementedException();
  }
  @Get('/:projectId/photos')
  @ApiOperation({ summary: 'Take All Photos from one project' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  GetAllPhotosFromProject(@Param('projectId', ParseIntPipe) projectId: number) {
    throw new NotImplementedException();
  }
}
