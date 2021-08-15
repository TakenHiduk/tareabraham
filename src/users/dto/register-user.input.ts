import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { UsernameRegex } from '../../common/regex/username.regex';

export class RegisterUserInput {
  @Matches(UsernameRegex)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
