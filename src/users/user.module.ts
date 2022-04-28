import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/module/prisma.module';
import { PrismaService } from 'prisma/module/prisma.service';
import { CompaniesService } from 'src/companies/companies.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, CompaniesService],
  exports: [UserService],
})
export class UsersModule {}
