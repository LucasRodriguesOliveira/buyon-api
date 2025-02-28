import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserPresenter } from '../../user/presenter/create-user.presenter';

@Exclude()
export class RegisterPresenter {
  @Expose()
  @ApiProperty({
    type: CreateUserPresenter,
  })
  user: CreateUserPresenter;

  @Expose()
  @ApiProperty({
    type: String,
  })
  token: string;
}
