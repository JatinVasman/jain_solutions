import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthService } from '../auth.service';
import { AccountStatus, AuthTokenPayload } from '@rental-platform/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token missing or invalid');
    }

    try {
      const secret = this.configService.get<string>('jwt.secret', 'dev-super-secure-rental-jwt-secret-phase3-key-2026');
      const payload = await this.jwtService.verifyAsync<AuthTokenPayload>(token, { secret });

      const user = await this.authService.getUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User account no longer exists');
      }

      if (user.status === AccountStatus.SUSPENDED) {
        throw new ForbiddenException('Your account has been suspended. Please contact customer support.');
      }

      if (user.status === AccountStatus.DEACTIVATED) {
        throw new ForbiddenException('This account has been deactivated.');
      }

      // Attach authenticated user to request
      (request as any).user = user;
      return true;
    } catch (err: unknown) {
      if (err instanceof ForbiddenException) {
        throw err;
      }
      throw new UnauthorizedException('Invalid or expired authentication session');
    }
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    // 1. Try HttpOnly cookie
    if (request.cookies && request.cookies.access_token) {
      return request.cookies.access_token;
    }

    // 2. Try Authorization Bearer header
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7).trim();
    }

    return undefined;
  }
}
