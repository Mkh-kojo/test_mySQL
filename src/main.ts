import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active CORS pour permettre les requêtes cross-origin
  app.enableCors({
    origin: 'http://localhost:3000', // Port où ton frontend React tourne
    methods: 'GET,POST,PUT,PATCH,DELETE',
  });

  await app.listen(3001); // Le backend sera lancé sur un port différent de celui du frontend (par exemple, 3001)
}
bootstrap();
