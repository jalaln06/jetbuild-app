import { Module } from '@nestjs/common';
import { CompaniesController } from './companies/companies.controller';
import { UserCompaniesController } from './companies/user.controller';
import { PhotoController } from './photo/photo.controller';
import { ProjectController } from './project/project.controller';
import { PointController } from './point/point.controller';
import { PrismaService } from 'prisma/module/prisma.service';
import { PhotosService } from './photo/photos.service';
import { UserService } from './users/user.service';
import { ProjectService } from './project/project.service';
import { PointService } from './point/point.service';
import { CompaniesService } from './companies/companies.service';
import { UsersModule } from './users/users.module';
import { UserController } from './users/user.controller';
@Module({
  imports: [UsersModule],
  controllers: [
    UserController,
    CompaniesController,
    UserCompaniesController,
    PhotoController,
    ProjectController,
    PointController,
  ],
  providers: [
    PrismaService,
    PhotosService,
    UserService,
    ProjectService,
    PointService,
    CompaniesService,
  ],
})
export class AppModule {}
