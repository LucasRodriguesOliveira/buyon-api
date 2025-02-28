import { Provider } from '@nestjs/common';
import { IUserService } from 'src/domain/service/user/user-service.interface';
import { UserService } from 'src/infrastructure/service/user.service';
import { CreateUserUseCase } from 'src/usecase/user/create-user.usecase';
import { Proxy } from '../../proxy';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { IHttpException } from 'src/domain/exception/http-exception.interface';

const token = Symbol('__CREATE_USER_USECASE__');
const provider: Provider = {
  provide: token,
  inject: [UserService, HttpExceptionService],
  useFactory: (service: IUserService, exceptionService: IHttpException) =>
    new CreateUserUseCase(service, exceptionService),
};

export const CreateUserProxy = new Proxy(token, provider);
