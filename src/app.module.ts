import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from the .env file

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
