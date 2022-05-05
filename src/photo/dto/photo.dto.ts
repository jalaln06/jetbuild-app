import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { isArrayBuffer } from 'util/types';

export class CreatePhotoDto {
  @IsString()
  @ApiProperty({ description: 'Photo description', example: 'Photo of toilet' })
  description: string;
  @IsString()
  @ApiProperty({ description: 'Name of Photo', example: 'Doe' })
  name: string;
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'userId', example: '1' })
  userId: number;
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'pointId', example: '1' })
  pointId: number;
  @ApiProperty({ description: 'S3 Url' })
  @IsString()
  S3Url: string;
}
export class ChangePhotoDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Photo description', example: 'Photo of toilet' })
  description?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Name of Photo', example: 'Doe' })
  name?: string;
}
