import { Provider } from '@nestjs/common';
import { Proxy } from '../../proxy';
import { UserService } from 'src/infrastructure/service/user.service';
import { IUserService } from 'src/domain/service/user/user-service.interface';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { IHttpException } from 'src/domain/exception/http-exception.interface';
import { FindUserByIdUseCase } from 'src/usecase/user/find-user-by-id.usecase';

const token = Symbol('__FIND_USER_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [UserService, HttpExceptionService],
  provide: token,
  useFactory: (service: IUserService, exceptionService: IHttpException) =>
    new FindUserByIdUseCase(service, exceptionService),
};

export const FindUserByIdProxy = new Proxy(token, provider);
