// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for WebSocket connections
  app.enableCors();

  // Use validation pipe for input validation
  app.useGlobalPipes(new ValidationPipe());

  // Use the IoAdapter to configure WebSocket options
  app.useWebSocketAdapter(new IoAdapter(app));

  // Start the application on port 3000 (or any port you prefer)
  await app.listen(3000);
}
bootstrap();
