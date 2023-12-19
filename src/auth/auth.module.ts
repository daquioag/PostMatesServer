import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";

@Module({
    imports: [NatsClientModule],
    controllers: [AuthController],
    providers: [],
})
export class AuthModule {}