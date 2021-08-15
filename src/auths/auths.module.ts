import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthsController } from './auths.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 30 * 60000, // 30 minutes
        },
      }),
    }),
    UsersModule,
  ],
  providers: [AuthsService, JwtStrategy],
  exports: [],
  controllers: [AuthsController],
})
export class AuthsModule {}
