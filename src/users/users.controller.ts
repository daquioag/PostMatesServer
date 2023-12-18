import { Controller, Post, Inject, Body } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dtos/CreateUser.dto";

@Controller('users')
export class UsersController {
    constructor(@Inject('NATS_SERVICE') private natsclient: ClientProxy){}

    // not interacting with a database in this controller
    // but interact with the NATS service
    // need to inject NATS service in this class
    @Post('create')
    createUser(@Body()createUserDto: CreateUserDto) {
        console.log(createUserDto)
        this.natsclient.send( {cmd: 'createUser'}, createUserDto)
    }
}