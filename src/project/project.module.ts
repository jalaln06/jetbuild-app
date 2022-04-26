import { Module } from '@nestjs/common';
import { PointService } from 'src/point/point.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PointService],
  exports: [ProjectService],
})
export class ProjectModule {}
