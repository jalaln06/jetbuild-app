import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @ApiProperty({ description: 'user login', example: 'johnatdude06' })
  name: string;
  @IsString()
  @ApiProperty({ description: 'user password', example: '12345' })
  password: string;
}

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'First name', example: 'John' })
  firstName: string;
  @IsString()
  @ApiProperty({ description: 'Last name', example: 'Doe' })
  lastName: string;
  @IsString()
  @ApiProperty({ description: 'user login', example: 'johnatdude06' })
  login: string;
  @IsString()
  @ApiProperty({ description: 'user password', example: '12345' })
  password: string;
  @IsString()
  @ApiProperty({ description: 'user email', example: 'johsdasd@gmail.com' })
  email: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'user title', example: 'John the carpenter' })
  description: string;
}
export class UpdateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Description + Title of the user',
    example: 'John the Carpenter',
  })
  about: string;
}
