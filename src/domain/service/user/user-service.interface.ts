import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from '../../types/result';
import { IUserResult } from './user-result.interface';
import { UserModel } from 'src/domain/model/user.model';
import { IUserResultList } from './user-result-list.interface';

export interface IUserService {
  findByEmail(email: string): Promise<Result<IUserResult, ErrorResponse>>;
  create(user: Partial<UserModel>): Promise<Result<IUserResult, ErrorResponse>>;
  findById(id: string): Promise<Result<IUserResult, ErrorResponse>>;
  list(): Promise<Result<IUserResultList, ErrorResponse>>;
  update(
    id: string,
    data: Partial<UserModel>,
  ): Promise<Result<IUserResult, ErrorResponse>>;
  delete(id: string): Promise<Result<IUserResult, ErrorResponse>>;
}
