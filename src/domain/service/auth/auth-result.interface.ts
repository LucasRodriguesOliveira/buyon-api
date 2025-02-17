import { UserModel } from 'src/domain/model/user.model';

export interface IAuthResult {
  user: UserModel;
  token: string;
}
