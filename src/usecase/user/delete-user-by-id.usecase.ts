import { IHttpException } from 'src/domain/exception/http-exception.interface';
import { UserModel } from 'src/domain/model/user.model';
import { IUserService } from 'src/domain/service/user/user-service.interface';
import { ErrorCode } from 'src/domain/types/error-code.enum';

export class DeleteUserByIdUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly exceptionService: IHttpException,
  ) {}

  public async run(userId: string): Promise<UserModel> {
    const result = await this.userService.delete(userId);

    if (result?.error) {
      if (result.error.code === ErrorCode.USER_NOT_FOUND) {
        this.exceptionService.notFound({
          message: result.error.message,
        });
      }

      this.exceptionService.internalServerError({
        message: result.error.message,
      });
    }

    return result.value.user;
  }
}
