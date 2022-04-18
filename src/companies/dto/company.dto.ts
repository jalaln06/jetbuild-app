import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Name', example: 'Jalal Venture' })
  name: string;
  @ApiProperty({
    description: 'Description',
    example: 'Venture creaeted by Jalal',
  })
  description: string;
  @ApiProperty({
    description: 'address of company',
    example: 'Torzhkovskaya d1k2',
  })
  address: string;
  @ApiProperty({
    description: 'city of company',
    example: 'Moscow',
  })
  city: string;
  @ApiProperty({
    description: 'Country of company',
    example: 'Russia',
  })
  country: string;
}
