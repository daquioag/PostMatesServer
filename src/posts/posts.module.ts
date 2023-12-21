import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";

@Module({
    imports: [NatsClientModule],
    controllers: [PostsController],
    providers: [],
})
export class PostsModule {}