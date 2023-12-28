import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import * as strings from '../../utils/strings';
import { AppConfig } from 'config';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const headerToken = this.extractTokenFromHeader(request);
    if (headerToken) {
      return this.verifyAndSetUser(request, headerToken);
    }

    // If no token in Authorization header, check cookies
    const cookieToken = this.extractTokenFromCookie(request);
    if (!cookieToken) {
      throw new UnauthorizedException();
    }
    return this.verifyAndSetUser(request, cookieToken);
  }
  private async verifyAndSetUser(request: Request, token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: AppConfig.JWT_SECRET,
      });
      request['user'] = payload;
    } catch (error){
      console.error('Verification Error:', error.message);

      console.log("oh now!")
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(strings.EXTRACTING_FROM_HEADER)
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    console.log(strings.EXTRACTING_FROM_COOKIE)
    const cookies = request.headers.cookie;
    if (cookies) {
      const cookieArray = cookies.split(';').map(cookie => cookie.trim());
      const tokenCookie = cookieArray.find(cookie => cookie.startsWith('access_token='));
      if (tokenCookie) {
        console.log("SDsdf")
        console.log(tokenCookie)
        return tokenCookie.split('=')[1];
      }
      console.log("nopde")

    }
    return undefined; 
  }
  
}