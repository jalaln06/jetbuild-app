import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
