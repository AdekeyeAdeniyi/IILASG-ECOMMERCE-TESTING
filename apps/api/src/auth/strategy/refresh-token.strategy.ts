import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDetailsWithTimestamps } from 'src/common/interface/user-details.interface';
import { Request } from 'express';

@Injectable()
export class RefreshToken extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_JWT_SECRET!,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: any,
  ): Promise<UserDetailsWithTimestamps> {
    const userId = payload.sub;

    const tokenFromHeader = req.headers['authorization']!.split(' ')[1];
    if (!tokenFromHeader) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const session = await this.authService.findRefreshTokenSession(userId);
    if (!session) {
      throw new UnauthorizedException('No session found');
    }

    if (tokenFromHeader !== session.refreshTokenId) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    if (session.revoked || new Date() > session.expiresAt) {
      throw new UnauthorizedException('Refresh token is expired or revoked');
    }

    const existingUser = await this.authService.validateRefreshToken(userId);

    return existingUser;
  }
}
