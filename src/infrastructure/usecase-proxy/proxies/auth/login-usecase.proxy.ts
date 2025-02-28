import { Provider } from '@nestjs/common';
import { LoginUseCase } from 'src/usecase/auth/login.usecase';
import { Proxy } from '../../proxy';
import { AuthService } from 'src/infrastructure/service/auth.service';
import { IAuthService } from 'src/domain/service/auth/auth-service.interface';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { IHttpException } from 'src/domain/exception/http-exception.interface';

const token = Symbol('__LOGIN_USE_CASE_PROXY__');
const provider: Provider = {
  inject: [AuthService, HttpExceptionService],
  provide: token,
  useFactory: (authService: IAuthService, exceptionService: IHttpException) =>
    new LoginUseCase(authService, exceptionService),
};

export const LoginProxy = new Proxy(token, provider);
