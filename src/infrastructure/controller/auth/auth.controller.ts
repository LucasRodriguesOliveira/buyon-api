import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  // UseInterceptors,
  // ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginProxy } from 'src/infrastructure/usecase-proxy/proxies/auth/login-usecase.proxy';
import { LoginUseCase } from 'src/usecase/auth/login.usecase';
import { LoginPresenter } from './presenter/login.presenter';
// import { RegisterPresenter } from './presenter/register.presenter';
// import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
// import { CreateUserDto } from '../user/dto/create-user.dto';
// import { CreateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/create-user.proxy';
// import { CreateUserUseCase } from 'src/usecase/user/create-user.usecase';
// import { plainToInstance } from 'class-transformer';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
// import { CreateUserPresenter } from '../user/presenter/create-user.presenter';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly httpExceptionService: HttpExceptionService,
    @Inject(LoginProxy.Token)
    private readonly loginUseCase: LoginUseCase,
    // @Inject(CreateUserProxy.Token)
    // private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPresenter,
  })
  public async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<LoginPresenter> {
    const result = await this.loginUseCase.login({
      email,
      password,
    });

    if (result.error) {
      this.httpExceptionService.unauthorized({
        message: result.error.message,
      });
    }

    console.log(result.value);

    return {
      token: result.value.token,
    };
  }

  // @Post('register')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiCreatedResponse({
  //   type: RegisterPresenter,
  // })
  // @UseInterceptors(new PresenterInterceptor(RegisterPresenter))
  // public async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  //   const user = await this.createUserUseCase.run(createUserDto);
  //   const access_token = await this.loginUseCase.login(user);

  //   return {
  //     user: plainToInstance(CreateUserPresenter, user),
  //     access_token,
  //   };
  // }
}
