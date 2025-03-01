import { IHttpException } from 'src/domain/exception/http-exception.interface';
import { UserModel } from 'src/domain/model/user.model';
import { IAuthService } from 'src/domain/service/auth/auth-service.interface';

export class LoginUseCase {
  constructor(
    private readonly authService: IAuthService,
    private readonly exceptionService: IHttpException,
  ) {}

  public async login(user: Partial<UserModel>) {
    const result = await this.authService.login(user);

    if (result.error) {
      this.exceptionService.unauthorized({
        message: result.error.message,
      });
    }

    return result.value;
  }
}
