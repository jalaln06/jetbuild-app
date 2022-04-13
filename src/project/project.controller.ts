import {
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('project')
export class ProjectController {
  @Get('/:companyId')
  getProjectsByCompanyId() {
    return 'Get all projects';
  }
  @Post('')
  createProject() {
    throw NotImplementedException;
  }
  @Post('/:userId')
  addUserToProject(@Param('userId') userId: string) {
    throw NotImplementedException;
  }
}
