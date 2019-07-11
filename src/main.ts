import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as xmlparser from 'express-xml-bodyparser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(xmlparser());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: '*',
  });
  await app.listen(3000);
}
bootstrap();
