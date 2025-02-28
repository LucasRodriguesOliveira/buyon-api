import { Provider } from '@nestjs/common';
import { Proxy } from '../../proxy';
import { UpdateUserUseCase } from 'src/usecase/user/update-user.usecase';
import { UserService } from 'src/infrastructure/service/user.service';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { IUserService } from 'src/domain/service/user/user-service.interface';
import { IHttpException } from 'src/domain/exception/http-exception.interface';

const token = Symbol('__UPDATE_USER_USE_CASE__');
const provider: Provider = {
  inject: [UserService, HttpExceptionService],
  provide: token,
  useFactory: (service: IUserService, exceptionService: IHttpException) =>
    new UpdateUserUseCase(service, exceptionService),
};

export const UpdateUserProxy = new Proxy(token, provider);
