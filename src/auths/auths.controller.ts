import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserInput } from '../users/dto/login-user.input';
import { Auth } from './dto/auth.response';
import { RegisterUserInput } from '../users/dto/register-user.input';
import { AuthsService } from './auths.service';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('login')
  login(@Body() loginUserInput: LoginUserInput): Promise<Auth> {
    return this.authsService.login(loginUserInput);
  }

  @Post('register')
  register(@Body() registerUserInput: RegisterUserInput): Promise<Auth> {
    return this.authsService.register(registerUserInput);
  }
}
