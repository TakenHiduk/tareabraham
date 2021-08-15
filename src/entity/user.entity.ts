import { MyBaseEntity } from './my-base-entity';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends MyBaseEntity {
  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;
}
