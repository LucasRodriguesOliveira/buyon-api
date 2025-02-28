import { IHttpException } from 'src/domain/exception/http-exception.interface';
import { UserModel } from 'src/domain/model/user.model';
import { IUserService } from 'src/domain/service/user/user-service.interface';

export class CreateUserUseCase {
  constructor(
    private readonly service: IUserService,
    private readonly exceptionService: IHttpException,
  ) {}

  public async run(user: Partial<UserModel>) {
    const result = await this.service.create(user);

    if (result.error) {
      this.exceptionService.internalServerError({
        message: result.error.message,
      });
    }

    return result.value;
  }
}
