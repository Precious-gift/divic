import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * The bootstrap function initializes the NestJS application and listens on port 3000.
 * It uses the AppModule for dependency injection and sets up a global validation pipe.
 */
async function bootstrap() {
  // Create a new NestJS application
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe with whitelist option
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Start listening on port 3000
  await app.listen(3000);
}

// Call the bootstrap function to start the application
bootstrap();
