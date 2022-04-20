import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project name', example: 'Work on Flat' })
  name: string;
  @ApiProperty({ description: 'Project Description', example: 'toilet' })
  description: string;
}
