import { Provider } from '@nestjs/common';
import { FindUserByEmailProxy } from './find-user-by-email-usecase.proxy';
import { CreateUserProxy } from './create-user-usecase.proxy';
import { FindUserByIdProxy } from './find-user-by-id.proxy';
import { ListUsersProxy } from './list-users.proxy';
import { UpdateUserProxy } from './update-user.proxy';
import { DeleteUserByIdProxy } from './delete-user-by-id.proxy';

export const UserProxy: Map<symbol, Provider> = new Map([
  FindUserByEmailProxy.Entry,
  FindUserByIdProxy.Entry,
  CreateUserProxy.Entry,
  ListUsersProxy.Entry,
  UpdateUserProxy.Entry,
  DeleteUserByIdProxy.Entry,
]);
