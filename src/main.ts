import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './infrastructure/config/types/app.interface';
import { APP_TOKEN } from './infrastructure/config/env/app.config';
import { HttpExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const { port } = configService.getOrThrow<AppConfig>(APP_TOKEN.description);

  app.useGlobalFilters(new HttpExceptionFilter(new LoggerService()));

  await app.listen(port);
}
bootstrap();
