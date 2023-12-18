import { Controller, Post, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('users')
export class UsersController {

    // not interacting with a database in this controller
    // but interact with the NATS service
    // need to inject NATS service in this class

    constructor(@Inject('NATS_SERVICE') private natscliend: ClientProxy){

    }
    @Post()
    createUser() {

    }
}