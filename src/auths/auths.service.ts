import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entity/user.entity';
import { LoginUserInput } from '../users/dto/login-user.input';
import { Auth } from './dto/auth.response';
import { RegisterUserInput } from '../users/dto/register-user.input';
import { UsersService } from '../users/users.service';

const argon2Options = {
  timeCost: 3,
  memoryCost: 4096,
  parallelism: 1,
  type: argon2.argon2id,
};

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.find(loginUserInput.identifier);
    if (!user) throw new BadRequestException('Bad Credentials');

    const isPasswordMatch = await this.comparePassword(
      user.password,
      loginUserInput.password,
    );
    if (!isPasswordMatch) throw new BadRequestException('Bad Credentials');

    const token = await this.generateJwt(user);

    const auth = new Auth();
    auth.access_token = token;
    auth.user = user;

    return auth;
  }

  async register(registerUserInput: RegisterUserInput) {
    const isUsernameTaken = await this.usersService.find(
      registerUserInput.username,
    );
    if (isUsernameTaken) throw new ConflictException('Username already taken');

    const isEmailTaken = await this.usersService.find(registerUserInput.email);
    if (isEmailTaken) throw new ConflictException('Email already taken');

    registerUserInput.password = await this.hashPassword(
      registerUserInput.password,
    );

    const user = await this.usersService.save(registerUserInput);

    const token = await this.generateJwt(user);

    const auth = new Auth();
    auth.access_token = token;
    auth.user = user;

    return auth;
  }

  generateJwt(user: User): Promise<string> {
    /**
     * See more in
     * https://www.youtube.com/watch?v=3o4vEIkiRgE
     * https://jwt.io/introduction
     */

    const payload = {
      sub: user.id,
    };
    return this.jwtService.signAsync(payload);
  }

  hashPassword(rawPassword: string): Promise<string> {
    try {
      return argon2.hash(rawPassword, { ...argon2Options });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  comparePassword(hashPassword: string, rawPassword: string): Promise<boolean> {
    try {
      return argon2.verify(hashPassword, rawPassword, { ...argon2Options });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
