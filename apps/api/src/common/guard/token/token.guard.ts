import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class TokenGuard extends AuthGuard('token') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
  handleRequest(err: any, user: any, info: any) {
    if (info?.message === 'No auth token') {
      throw new UnauthorizedException('Token is not provided');
    }

    if (err || !user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return user;
  }
}
