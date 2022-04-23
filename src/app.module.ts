import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { PointModule } from './point/point.module';
import { PhotoModule } from './photo/photo.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/user.module';
import { PrismaModule } from 'prisma/module/prisma.module';
import { PrismaService } from 'prisma/module/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
