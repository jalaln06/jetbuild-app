import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project name', example: 'John' })
  name: string;
  @ApiProperty({ description: 'Project Description', example: 'Doe' })
  description: string;
}
