import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorFilter } from './common/global-error-filter';
import helmet from "helmet"
import * as  compression from "compression"

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  app.use(helmet())
  app.enableCors() 
  app.use(compression())

  app.useGlobalFilters(new GlobalErrorFilter())
  await app.listen(3000);

} 
bootstrap();
