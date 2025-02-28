import { IHttpException } from 'src/domain/exception/http-exception.interface';
import { UserModel } from 'src/domain/model/user.model';
import { IUserService } from 'src/domain/service/user/user-service.interface';
import { ErrorCode } from 'src/domain/types/error-code.enum';

export class ListUsersUseCase {
  constructor(
    private readonly service: IUserService,
    private readonly exceptionService: IHttpException,
  ) {}

  public async run(): Promise<UserModel[]> {
    const result = await this.service.list();

    if (result?.error?.code === ErrorCode.UNEXPECTED) {
      this.exceptionService.internalServerError({
        message: result.error.message,
      });
    }

    return result.value.users;
  }
}
