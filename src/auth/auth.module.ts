import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [NatsClientModule,
        JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '15m' },
      }),],
    controllers: [AuthController],
    providers: [],
})
export class AuthModule {}