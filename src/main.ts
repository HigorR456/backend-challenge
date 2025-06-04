import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `Server is running, GraphQL Playground available at http://${process.env.HOST}:${process.env.PORT}`,
  );
}
bootstrap();
