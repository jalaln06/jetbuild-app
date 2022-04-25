import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @ApiProperty({ description: 'Photo description', example: 'Photo of toilet' })
  description: string;
  @IsString()
  @ApiProperty({ description: 'Name of Photo', example: 'Doe' })
  name: string;
  @IsString()
  @ApiProperty({ description: 'userId', example: '123141242144142141' })
  user_id: number;
  @IsString()
  @ApiProperty({ description: 'pointId', example: 'johnatdude06' })
  point_id: number;
  @IsString()
  @ApiProperty({ description: 'Photo byte array', example: 'some photo' })
  byte_array: string;
}
