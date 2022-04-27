import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePointDto {
  @IsString()
  @ApiProperty({ description: 'Name of point', example: 'John' })
  name: string;
  @IsString()
  @ApiProperty({ description: ' Description of point', example: 'Doe' })
  description: string;
  @IsNumber()
  @ApiProperty({ description: 'Project Id', example: '1' })
  projectId: number;
}
