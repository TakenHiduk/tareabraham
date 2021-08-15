import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './auths/auths.module';
import { UsersModule } from './users/users.module';
import * as fs from 'fs';
import * as path from 'path';
import { User } from './entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // postgres | mssql
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        ssl: {
          rejectUnauthorized: configService.get('DB_SSL__REJECT_UNAUTHORIZED'), // esto sirve para rechazar la conexion si no se usa un certificado
          ca: fs.readFileSync(path.join(__dirname, '..', 'ca-certificate.crt')), // TU CERTIFICADO ABRAHAM. si no usas ssl puedes borrar ssl: { any }
        },
        synchronize: true,
        logging: true,
        entities: [User],
        migrations: ['./migration/**/*.{ts,js}'],
        subscribers: ['./subscriber/**/*.{ts,js}'],
        cli: {
          entitiesDir: './entity',
          migrationsDir: './migration',
          subscribersDir: './subscriber',
        },
      }),
    }),
    AuthsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
