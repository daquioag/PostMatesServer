
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as strings from '../../utils/strings';
import { AppConfig } from '../../../config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: AppConfig.JWT_SECRET,
    });
  }


  private static  extractJWTFromCookie(req: Request): string | null {
    console.log("EXTRACTION!")
    console.log(req.cookies)
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any) {
    console.log(strings.VALIDATING_USER, payload);
    return { userId: payload.sub, email: payload.email, username : payload.username };
  }
}