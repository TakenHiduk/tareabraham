import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserInput {
  @IsNotEmpty()
  identifier: string;

  @MinLength(5)
  password: string;
}
