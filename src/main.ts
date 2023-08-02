import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorFilter } from './common/global-error-filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalErrorFilter())
  await app.listen(3000);

}
bootstrap();
