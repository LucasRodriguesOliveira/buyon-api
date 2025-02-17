import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class RegisterPresenter {
  @Expose()
  user: any;

  @Expose()
  @ApiProperty({
    type: String,
  })
  access_token: string;
}
