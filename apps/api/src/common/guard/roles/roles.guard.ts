import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'generated/prisma';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { JwtPayload } from 'src/common/interface/jwt.payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const [, token] = request['headers']['authorization']?.split(' ');

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return requiredRoles.some((role) => payload.role === role);
  }
}
