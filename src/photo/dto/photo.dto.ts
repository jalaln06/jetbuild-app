import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ description: 'Photo description', example: 'Photo of toilet' })
  description: string;
  @ApiProperty({ description: 'Name of Photo', example: 'Doe' })
  name: string;
  @ApiProperty({ description: 'userId', example: '123141242144142141' })
  user_id: number;
  @ApiProperty({ description: 'pointId', example: 'johnatdude06' })
  point_id: number;
  @ApiProperty({ description: 'Photo byte array', example: 'some photo' })
  byte_array: string;
}
