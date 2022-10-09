import { ApiProperty } from '@nestjs/swagger';
import { Stage } from '@prisma/client';
import { IsString, isString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @ApiProperty({ description: 'Project name', example: 'Work on Flat' })
  name: string;
  @IsString()
  @ApiProperty({ description: 'Project Description', example: 'toilet' })
  description: string;
}
export class UpdateProjectDto {
  @IsString()
  @ApiProperty({ description: 'Stage', example: 'INPROGRESS' })
  stage: Stage;
}
