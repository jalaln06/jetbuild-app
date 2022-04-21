import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ description: 'user login', example: 'johnatdude06' })
  name: string;
  @ApiProperty({ description: 'user password', example: '12345' })
  password: string;
}

export class CreateUserDto {
  @ApiProperty({ description: 'First name', example: 'John' })
  firstName: string;
  @ApiProperty({ description: 'Last name', example: 'Doe' })
  lastName: string;
  @ApiProperty({ description: 'user login', example: 'johnatdude06' })
  login: string;
  @ApiProperty({ description: 'user password', example: '12345' })
  password: string;
  @ApiProperty({ description: 'user email', example: 'johsdasd@gmail.com' })
  email: string;
}
