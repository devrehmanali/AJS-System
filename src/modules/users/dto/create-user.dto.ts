import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  // @IsString()
  // @IsNotEmpty()
  // username: string;

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
