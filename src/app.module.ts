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
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserController } from './users/user.controller';
import { AppController } from './app.controller';
@Module({
  imports: [AuthModule, UsersModule],
  controllers: [
    UserController,
    CompaniesController,
    UserCompaniesController,
    PhotoController,
    ProjectController,
    PointController,
    AppController,
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
