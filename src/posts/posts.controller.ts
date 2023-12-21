import { Controller, Post, Inject, Body } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreatePostDto } from "./dtos/CreatePost.dto";

@Controller('posts')
export class PostsController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy){}

    // not interacting with a database in this controller
    // but interact with the NATS service
    // need to inject NATS service in this class
    @Post('createPost')
    createUser(@Body() createPostDto: CreatePostDto) {
        console.log("createPostDto2")
        console.log(createPostDto)
        // we can return this if you want a resposne
        this.natsClient.emit('createPost', createPostDto)
    }
}