import { Module } from '@nestjs/common';
import { PointService } from 'src/point/point.service';
import { PrismaModule } from 'prisma/module/prisma.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService, PointService],
  exports: [ProjectService],
})
export class ProjectModule {}
