import { Provider } from '@nestjs/common';
import { LoginUseCase } from 'src/usecase/auth/login.usecase';
import { Proxy } from '../../proxy';
import { AuthService } from 'src/infrastructure/service/auth.service';
import { IAuthService } from 'src/domain/service/auth/auth-service.interface';

const token = Symbol('__LOGIN_USE_CASE_PROXY__');
const provider: Provider = {
  inject: [AuthService],
  provide: token,
  useFactory: (authService: IAuthService) => new LoginUseCase(authService),
};

export const LoginProxy = new Proxy(token, provider);
