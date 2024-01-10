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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dtos/LoginUserDto';
import { Response, Request } from 'express';
import * as strings from '../utils/strings';
import { JwtAuthGuard } from './utils/jwt-auth.guard';
import { lastValueFrom } from 'rxjs';
import { Public } from './utils/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  // not interacting with a database in this controller
  // but interact with the NATS service
  // need to inject NATS service in this class
  @Post('login')
  @Public()
  async loginUser(
    @Res({ passthrough: true }) res: Response,
    @Body() loginUserDto: LoginUserDto,
  ) {
    try {
      console.log(loginUserDto)

      const access_token = await lastValueFrom(
        this.natsClient.send( 
          {cmd : 'validateUser'}, 
          loginUserDto),
        )
        
      res.cookie('access_token', access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax', // change to lax for local testing and none for hosting
        }).send({ status: 'Ok', success: true });
    } catch (error)  {
          // Handle other exceptions
          console.error(strings.INVALID_CREDENTIALS);
          res
            .status(HttpStatus.UNAUTHORIZED)
            .send({ message: strings.INVALID_CREDENTIALS, status: false });
        }
    
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (req.user) {
      const user = req.user;
      // Expire the cookie by setting it to an expired date
      res.cookie('access_token', '', { expires: new Date(0) });
    }   
     return {message: strings.LOGGED_OUT};
  }
}
