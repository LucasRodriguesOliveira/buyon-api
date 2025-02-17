import { UserModel } from 'src/domain/model/user.model';
import { IAuthService } from 'src/domain/service/auth/auth-service.interface';

export class LoginUseCase {
  constructor(private readonly authService: IAuthService) {}

  public async login(user: Partial<UserModel>) {
    return this.authService.login(user);
  }
}
