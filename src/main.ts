import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: ['http://localhost:3001'],
    credentials: true,
  } }); // Enable CORS
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe)
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`running on PORT ${PORT}`));
}
bootstrap();
