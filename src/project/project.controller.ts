import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { PointService } from 'src/point/point.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
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
  async CreateNewProject(
    @Body() project: CreateProjectDto,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    try {
      return await this.projectService.createProject(project, companyId);
    } catch (error) {}
  }

  @Post('/:projectId/user/:userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'assign user to project' })
  @ApiForbiddenResponse({ description: 'You have no rights to write here' })
  @ApiBadRequestResponse({ description: 'Project not found' })
  @ApiBadRequestResponse({ description: 'User not found' })
  addUserToProject(@Param('userId', ParseIntPipe) userId: number) {
    throw new NotImplementedException();
  }
  @Delete('/:projectId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: ' Delete project' })
  async deletePoint(@Param('projectId', ParseIntPipe) projectId: number) {
    return await this.projectService.delete(projectId);
  }
  @Get('/:projectId/points')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Take All Points from one project' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({})
  @ApiQuery({ type: PaginationDTO })
  @ApiBadRequestResponse({ description: 'Project not found' })
  GetAllPhotosFromPoint(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('limit', ParseIntPipe) limit,
    @Query('page', ParseIntPipe) page,
  ) {
    return this.pointService.getPointsFromProject(projectId, limit, page);
  }

  @Patch('/:projectId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Project' })
  @Roles(Role.OWNER, Role.MANAGER)
  ChangeState(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() data: UpdateProjectDto,
  ) {
    return this.projectService.changeState(projectId, data);
  }
}
