import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { CompaniesController } from './companies/companies.controller';
import { UserCompaniesController } from './companies/user.controller';
import { PhotoController } from './photo/photo.controller';
import { ProjectController } from './project/project.controller';
import { PointController } from './point/point.controller';
import { PrismaService } from 'prisma/module/prisma.service';
import { AppController } from './app.controller';
import { PhotosService } from './photo/photos.service';
import { UserService } from './user/user.service';
import { ProjectService } from './project/project.service';
import { PointService } from './point/point.service';
import { CompaniesService } from './companies/companies.service';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [],
  controllers: [
    AppController,
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
    AuthService,
  ],
})
export class AppModule {}
