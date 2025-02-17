import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { AuthProxy } from './proxies/auth/auth.proxy';
import { UserProxy } from './proxies/user/user.proxy';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [LoggerModule, ServiceModule],
})
export class UsecaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [...AuthProxy.values(), ...UserProxy.values()],
      exports: [...AuthProxy.keys(), ...UserProxy.keys()],
    };
  }
}
