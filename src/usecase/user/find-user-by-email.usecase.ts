import { IUserService } from 'src/domain/service/user/user-service.interface';

export class FindUserByEmailUseCase {
  constructor(private readonly userService: IUserService) {}

  async run(email: string) {
    return this.userService.findByEmail(email);
  }
}
