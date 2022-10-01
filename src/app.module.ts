import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { PointModule } from './point/point.module';
import { PhotoModule } from './photo/photo.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/user.module';
import { PrismaModule } from 'prisma/module/prisma.module';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventsGateway } from './events/events.gateway';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    UsersModule,
    ProjectModule,
    PointModule,
    PhotoModule,
    CompaniesModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {}
