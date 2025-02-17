import { Observable } from 'rxjs';
import { ILoginRequest } from './messages/login.message';
import { Result } from 'src/domain/types/result';
import { IAuthResult } from 'src/domain/service/auth/auth-result.interface';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { IRegisterRequest } from './messages/register.message';

export interface IGrpcAuthService {
  login(data: ILoginRequest): Observable<Result<IAuthResult, ErrorResponse>>;
  register(
    data: IRegisterRequest,
  ): Observable<Result<IAuthResult, ErrorResponse>>;
}
