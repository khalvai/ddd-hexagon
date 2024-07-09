import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupDocument } from 'src/modules/Common/Infrastructure/Input/Swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupDocument(app, "api-docs");
  await app.listen(3000);
}
bootstrap();
