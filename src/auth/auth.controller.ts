import { Controller, Post, Inject, Body } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dtos/CreateUser.dto";

@Controller('auth')
export class AuthController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy){}

    // not interacting with a database in this controller
    // but interact with the NATS service
    // need to inject NATS service in this class
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto)
         return this.natsClient.send({cmd: 'createUser'}, createUserDto)
    }
}