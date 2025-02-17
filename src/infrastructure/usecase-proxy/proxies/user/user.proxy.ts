import { Provider } from '@nestjs/common';
import { FindUserByEmailProxy } from './find-user-by-email-usecase.proxy';

export const UserProxy: Map<symbol, Provider> = new Map([
  FindUserByEmailProxy.Entry,
]);
