import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository'
import { ConfigService } from '../../config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy'
import { ConfigModule } from '../../config/config.module';
import { Configuration } from '../../config/config.key';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 3600
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
