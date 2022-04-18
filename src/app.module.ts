import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { PointModule } from './point/point.module';
import { PhotoModule } from './photo/photo.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'prisma/module/prisma.module';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { PrismaService } from 'prisma/module/prisma.service';
import { PrismaClient } from '@prisma/client';
@Module({
  imports: [
    UsersModule,
    ProjectModule,
    PointModule,
    PhotoModule,
    CompaniesModule,
    PrismaService,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
