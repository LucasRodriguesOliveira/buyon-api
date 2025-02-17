import { Result } from 'src/domain/types/result';
import { UserModel } from '../../model/user.model';
import { IAuthResult } from './auth-result.interface';
import { ErrorResponse } from 'src/domain/types/error.interface';

export interface IAuthService {
  login(
    userData: Partial<UserModel>,
  ): Promise<Result<IAuthResult, ErrorResponse>>;
  register(
    userData: Partial<UserModel>,
  ): Promise<Result<IAuthResult, ErrorResponse>>;
}
