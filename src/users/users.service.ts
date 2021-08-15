import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import validateIdentifier, { IdentifierType } from '../utils/identifier.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  save(registerUserInput: RegisterUserInput) {
    return this.usersRepository.save(registerUserInput);
  }

  find(identifier: string): Promise<User | undefined> {
    const result: IdentifierType = validateIdentifier(identifier);

    if (result === IdentifierType.ID)
      return this.usersRepository.findOne({ where: { id: identifier } });

    if (result === IdentifierType.USERNAME)
      return this.usersRepository.findOne({ where: { username: identifier } });

    if (result === IdentifierType.EMAIL)
      return this.usersRepository.findOne({ where: { email: identifier } });

    return undefined;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(): Promise<User> {
    // TODO: Implement me
    const dbUser = await this.find('');
    return this.usersRepository.save(dbUser);
  }

  async delete(identifier: string): Promise<boolean> {
    const dbUser = await this.find(identifier);
    await this.usersRepository.delete(dbUser.id);
    return true;
  }
}
