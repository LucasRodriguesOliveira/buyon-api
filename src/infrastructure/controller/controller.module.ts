import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { HttpExceptionModule } from '../http-exception/http-exception.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [UsecaseProxyModule.register(), HttpExceptionModule, LoggerModule],
  controllers: [AuthController],
})
export class ControllerModule {}
