// login.dto.ts
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(2)
  password: string;
}