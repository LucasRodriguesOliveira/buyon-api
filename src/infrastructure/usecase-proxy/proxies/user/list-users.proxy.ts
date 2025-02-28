import { Provider } from '@nestjs/common';
import { Proxy } from '../../proxy';
import { UserService } from 'src/infrastructure/service/user.service';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { IUserService } from 'src/domain/service/user/user-service.interface';
import { IHttpException } from 'src/domain/exception/http-exception.interface';
import { ListUsersUseCase } from 'src/usecase/user/list-users.usecase';

const token = Symbol('__LIST_USERS_USE_CASE__');
const provider: Provider = {
  inject: [UserService, HttpExceptionService],
  provide: token,
  useFactory: (service: IUserService, exceptionService: IHttpException) =>
    new ListUsersUseCase(service, exceptionService),
};

export const ListUsersProxy = new Proxy(token, provider);
