import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([{
    name: 'NATS_SERVICE',
    transport: Transport.NATS,
    options: {
      servers : ['nats://nats', 'nats://localhost:4222']
    }
  }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
