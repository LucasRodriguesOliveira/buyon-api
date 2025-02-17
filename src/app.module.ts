import { Module } from '@nestjs/common';
import { ControllerModule } from './infrastructure/controller/controller.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './infrastructure/config/env/env.config';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './infrastructure/config/pino/pino.config';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { HttpExceptionModule } from './infrastructure/http-exception/http-exception.module';
import { LoggerModule as CustomLoggerModule } from './infrastructure/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    LoggerModule.forRootAsync(pinoConfig()),
    ControllerModule,
    UsecaseProxyModule.register(),
    HttpExceptionModule,
    CustomLoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
