import { Provider } from '@nestjs/common';
import { IUserService } from 'src/domain/service/user/user-service.interface';
import { UserService } from 'src/infrastructure/service/user.service';
import { FindUserByEmailUseCase } from 'src/usecase/user/find-user-by-email.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_USER_BY_EMAIL_USE_CASE__');
const provider: Provider = {
  provide: token,
  inject: [UserService],
  useFactory: (userService: IUserService) =>
    new FindUserByEmailUseCase(userService),
};

export const FindUserByEmailProxy = new Proxy(token, provider);
