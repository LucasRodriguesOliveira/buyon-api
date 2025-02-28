import { Provider } from '@nestjs/common';
import { Proxy } from '../../proxy';
import { DeleteUserByIdUseCase } from 'src/usecase/user/delete-user-by-id.usecase';
import { UserService } from 'src/infrastructure/service/user.service';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { IUserService } from 'src/domain/service/user/user-service.interface';
import { IHttpException } from 'src/domain/exception/http-exception.interface';

const token = Symbol('__DELETE_USER_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [UserService, HttpExceptionService],
  provide: token,
  useFactory: (service: IUserService, exceptionService: IHttpException) =>
    new DeleteUserByIdUseCase(service, exceptionService),
};

export const DeleteUserByIdProxy = new Proxy(token, provider);
