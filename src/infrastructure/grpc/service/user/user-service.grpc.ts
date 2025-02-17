import { Result } from 'src/domain/types/result';
import { FindUserByEmailRequest } from './messages/find-user-by-email.message';
import { IUserResult } from '../../../../domain/service/user/user-result.interface';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Observable } from 'rxjs';

export interface IGrpcUserService {
  findByEmail(
    data: FindUserByEmailRequest,
  ): Observable<Result<IUserResult, ErrorResponse>>;
}
