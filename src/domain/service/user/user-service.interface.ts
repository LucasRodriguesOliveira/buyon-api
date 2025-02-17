import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from '../../types/result';
import { IUserResult } from './user-result.interface';

export interface IUserService {
  findByEmail(email: string): Promise<Result<IUserResult, ErrorResponse>>;
}
