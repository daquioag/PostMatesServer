import { Controller, Post, Inject, Body, Get, Param, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreatePostDto } from "./dtos/CreatePost.dto";
import { lastValueFrom } from "rxjs";
import { JwtAuthGuard } from "src/auth/utils/jwt-auth.guard";

@Controller('posts')
export class PostsController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy){}

    // not interacting with a database in this controller
    // but interact with the NATS service
    // need to inject NATS service in this class
    @Post('createPost')
    createPost(@Body() createPostDto: CreatePostDto) {
        // we can return this if you want a resposne
        this.natsClient.emit('createPost', createPostDto)
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