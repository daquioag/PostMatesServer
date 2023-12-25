import {
  Controller,
  Post,
  Inject,
  Body,
  Get,
  Res,
  UseGuards,
  HttpStatus,
  Req,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { LoginUserDto } from './dtos/LoginUserDto';
import { Response, Request } from 'express';
import * as strings from '../utils/strings';
import { JwtAuthGuard } from './utils/jet-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  // not interacting with a database in this controller
  // but interact with the NATS service
  // need to inject NATS service in this class
  @Post('login')
  async loginUser(
    @Res({ passthrough: true }) res: Response,
    @Body() loginUserDto: LoginUserDto,
  ) {
    console.log(loginUserDto);

    try {
      const access_token = await this.natsClient.send(
        { cmd: 'validateUser' },
        loginUserDto,
      );
      res
        .cookie('access_token', access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax', // change to lax for local testing and none for hosting
        })
        .send({ status: 'Ok', success: true });
    } catch (error) {
        if (error instanceof NotFoundException) {
          // Handle user not found exception
          console.error(strings.INVALID_CREDENTIALS); // TODO change to 
          res
            .status(HttpStatus.NOT_FOUND)
            .send({ message: strings.INVALID_CREDENTIALS, status: false }); // TODO change this string to invalid username or password
        } else if (error instanceof UnauthorizedException) {
          // Handle invalid password exception
          console.error(strings.INVALID_CREDENTIALS); // TODO change this string to invalid username or password
          res
            .status(HttpStatus.UNAUTHORIZED)
            .send({ message: 'Invalid password', status: false });
        } else {
          // Handle other exceptions
          console.error(strings.INTERNAL_SERVER_ERROR);
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: strings.INTERNAL_SERVER_ERROR, status: false });
        }
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (req.user) {
      const user = req.user;
      // Expire the cookie by setting it to an expired date
      res.cookie('access_token', '', { expires: new Date(0) });
    }   
     return {message: strings.LOGGED_OUT};
  }
}
