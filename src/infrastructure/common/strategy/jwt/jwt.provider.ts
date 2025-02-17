import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { JwtStrategy } from './jwt.strategy';
import { ILogger } from 'src/domain/logger/logger.interface';
import { FindUserByEmailUseCase } from 'src/usecase/user/find-user-by-email.usecase';
import { FindUserByEmailProxy } from 'src/infrastructure/usecase-proxy/proxies/user/find-user-by-email-usecase.proxy';

export const JwtStrategyProvider: Provider = {
  inject: [
    FindUserByEmailProxy.Token,
    ConfigService,
    LoggerService,
    HttpExceptionService,
  ],
  provide: JwtStrategy,
  useFactory: (
    findUserByEmailUseCase: FindUserByEmailUseCase,
    configService: ConfigService,
    logger: ILogger,
    exceptionService: HttpExceptionService,
  ) =>
    new JwtStrategy(
      findUserByEmailUseCase,
      configService,
      logger,
      exceptionService,
    ),
};
