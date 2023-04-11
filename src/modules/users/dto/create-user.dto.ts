import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  user_id: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  isLoggedIn: boolean;
}
