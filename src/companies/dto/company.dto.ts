import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @ApiProperty({ description: 'Name', example: 'Jalal Venture' })
  name: string;
  @ApiProperty({
    description: 'Description',
    example: 'Venture creaeted by Jalal',
  })
  @IsString()
  description: string;
  @ApiProperty({
    description: 'address of company',
    example: 'Torzhkovskaya d1k2',
  })
  @IsString()
  address: string;
  @ApiProperty({
    description: 'city of company',
    example: 'Moscow',
  })
  @IsString()
  city: string;
  @ApiProperty({
    description: 'Country of company',
    example: 'Russia',
  })
  @IsString()
  country: string;
}

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Name', example: 'Jalal Venture' })
  name: string;
  @ApiProperty({
    description: 'Description',
    example: 'Venture creaeted by Jalal',
  })
  @IsOptional()
  @IsString()
  description: string;
  @ApiProperty({
    description: 'address of company',
    example: 'Torzhkovskaya d1k2',
  })
  @IsString()
  @IsOptional()
  address: string;
  @ApiProperty({
    description: 'city of company',
    example: 'Moscow',
  })
  @IsString()
  @IsOptional()
  city: string;
  @ApiProperty({
    description: 'Country of company',
    example: 'Russia',
  })
  @IsString()
  country: string;
}
