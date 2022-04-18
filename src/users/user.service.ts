import { Injectable } from '@nestjs/common';
import { User, Prisma, Role } from '@prisma/client';
import { PrismaService } from 'prisma/module/prisma.service';

@Injectable()
export class UserService {}
