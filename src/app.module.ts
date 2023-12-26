import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
dotenv.config(); // Load environment variables from the .env file

@Module({
  imports: [UsersModule, PostsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
