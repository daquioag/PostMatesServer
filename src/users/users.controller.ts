import { Controller, Get, Post, Inject, Body, Param } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { Public } from "src/auth/utils/auth.guard";

@Controller('users')
export class UsersController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy){}

    // not interacting with a database in this controller
    // but interact with the NATS service
    // need to inject NATS service in this class
    @Post('create')
    @Public()
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto)
         return this.natsClient.send({cmd: 'createUser'}, createUserDto)
    }

    @Get(':id')
    getUserById(@Param('id') id: number){
        return this.natsClient.send({cmd: 'getUserById'}, {userId: id})
    }
}