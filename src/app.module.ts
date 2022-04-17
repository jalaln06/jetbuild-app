import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { PointModule } from './point/point.module';
import { PhotoModule } from './photo/photo.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    UsersModule,
    ProjectModule,
    PointModule,
    PhotoModule,
    CompaniesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
