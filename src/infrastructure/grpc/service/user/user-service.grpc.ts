import { Result } from 'src/domain/types/result';
import { FindUserByEmailRequest } from './messages/find-user-by-email.message';
import { IUserResult } from '../../../../domain/service/user/user-result.interface';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Observable } from 'rxjs';
import { CreateUserRequest } from './messages/create-user.message';
import { FindUserByIdRequest } from './messages/find-user-by-id.message';
import { ListUserRequest } from './messages/list-user.message';
import { IUserResultList } from 'src/domain/service/user/user-result-list.interface';
import { UpdateUserByIdRequest } from './messages/update-user.message';
import { DeleteUserByIdRequest } from './messages/delete-user.message';

export interface IGrpcUserService {
  findByEmail(
    req: FindUserByEmailRequest,
  ): Observable<Result<IUserResult, ErrorResponse>>;
  create(
    req: CreateUserRequest,
  ): Observable<Result<IUserResult, ErrorResponse>>;
  findById(
    req: FindUserByIdRequest,
  ): Observable<Result<IUserResult, ErrorResponse>>;
  list(
    req: ListUserRequest,
  ): Observable<Result<IUserResultList, ErrorResponse>>;
  update(
    req: UpdateUserByIdRequest,
  ): Observable<Result<IUserResult, ErrorResponse>>;
  delete(
    req: DeleteUserByIdRequest,
  ): Observable<Result<IUserResult, ErrorResponse>>;
}
