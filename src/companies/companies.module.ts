import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/module/prisma.module';
import { ProjectService } from 'src/project/project.service';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [PrismaModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, ProjectService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
