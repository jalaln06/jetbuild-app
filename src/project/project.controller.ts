import {
  Body,
  Controller,
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
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { unwatchFile } from 'fs';
import { PointService } from 'src/point/point.service';
import { CreateProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';
@ApiBearerAuth()
@ApiTags('projects')
@Controller('project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private pointService: PointService,
  ) {}
  @Post('/:companyId')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Take All Photos from one project' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Photos not found' })
  GetAllPhotosFromProject(@Param('projectId', ParseIntPipe) projectId: number) {
    throw new NotImplementedException();
  }
  @Get('/:projectId/points')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Take All Points from one project' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'Points not found' })
  GetAllPhotosFromPoint(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.pointService.getPointsFromProject(projectId);
  }
}
