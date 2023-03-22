import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const config = {
  port: 3000,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.warn(`Server running on port ${config.port}`);
  await app.listen(config.port);
}
bootstrap();
