import { Module } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, ProjectService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
