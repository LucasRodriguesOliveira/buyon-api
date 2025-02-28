import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { HttpExceptionModule } from '../http-exception/http-exception.module';
import { LoggerModule } from '../logger/logger.module';
import { UserResolver } from './user/user.resolver';
import { AuthResolver } from './auth/auth.resolver';

@Module({
  imports: [UsecaseProxyModule.register(), HttpExceptionModule, LoggerModule],
  providers: [UserResolver, AuthResolver],
})
export class ResolverModule {}
