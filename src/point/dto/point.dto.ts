import { ApiProperty } from '@nestjs/swagger';

export class CreatePointDto {
  @ApiProperty({ description: 'Name of point', example: 'John' })
  name: string;
  @ApiProperty({ description: ' Description of point', example: 'Doe' })
  description: string;
  @ApiProperty({ description: 'Project Id', example: '1' })
  projectId: number;
}
