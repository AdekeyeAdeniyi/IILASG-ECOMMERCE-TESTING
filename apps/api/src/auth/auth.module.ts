import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import refreshConfig from './config/refresh.config';
import { RefreshToken } from './strategy/refresh-token.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(refreshConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    PrismaService,
    RefreshToken,
    GoogleStrategy,
  ],
})
export class AuthModule {}
