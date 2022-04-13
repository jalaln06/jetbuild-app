import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Name', example: 'Jalal Venture' })
  first_name: string;
  @ApiProperty({ description: 'ownerId', example: '12314312345145' })
  login: string;
  @ApiProperty({
    description: 'address of company',
    example: 'Moscow Torzhkovskaya d1k2',
  })
  address: string;
  @ApiProperty({
    description: 'Country of company',
    example: 'Russia',
  })
  country: string;
}
