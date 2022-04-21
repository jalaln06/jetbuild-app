import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { PointModule } from './point/point.module';
import { PhotoModule } from './photo/photo.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/user.module';
import { PrismaModule } from 'prisma/module/prisma.module';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { PrismaService } from 'prisma/module/prisma.service';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    ProjectModule,
    PointModule,
    PhotoModule,
    CompaniesModule,
    PrismaService,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
