import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./utils/JwtStrategy";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from "./utils/auth.guard";
import { AppConfig } from "config";

@Module({
    imports: [NatsClientModule,
        JwtModule.register({
        global: true,
        secret: AppConfig.JWT_SECRET,
        signOptions: { expiresIn: '15m' },
      }), PassportModule],
    controllers: [AuthController],
    providers: [{
        provide: APP_GUARD,
        useClass: AuthGuard,
      },
      JwtStrategy],
})
export class AuthModule {}