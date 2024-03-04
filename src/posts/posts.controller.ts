import { Controller, Post, Inject, Body, Get, Param, UseGuards, Req} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreatePostDto } from "./dtos/CreatePost.dto";
import { lastValueFrom } from "rxjs";
import { JwtAuthGuard } from "src/auth/utils/jwt-auth.guard";
import { Response, Request } from 'express';

@Controller('posts')
export class PostsController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy){}

    // not interacting with a database in this controller
    // but interact with the NATS service
    // need to inject NATS service in this class
    @Post('createPost')
    createPost(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
      try {
        
        const userId: number = (req.user as any).sub;

        this.natsClient.emit('createPost', { ...createPostDto, userId });
        return { message: "Post created", success: true,};
      } catch (error) {
        // Handle the error here
        console.error('Error creating post:', error.message);
        throw new RpcException('Failed to create post. Please try again.');
      }
    }

    @Get('getPosts')
    async getAllPosts() {
        // we can return this if you want a resposne
        console.log("trying to get all posts");
        const posts = await lastValueFrom(
          this.natsClient.send({cmd: 'fetchPosts'}, {}),
        );
        console.log(posts)

        return posts
    }

    @Get(':id')
    async getPostsById(@Param('id') userId: number) {
      try {
        console.log("Trying to get posts by userID in the controller of the API gateway!");
        console.log(userId)
        const posts = await lastValueFrom(
            this.natsClient.send({ cmd: 'fetchPostsById' }, { userId }),
          );

        return posts;
      } catch (error) {
        // Handle errors, log, or return a meaningful response
        console.error(error);
        return { error: 'Failed to fetch posts.' };
      }
    }
}    