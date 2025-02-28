import { Inject, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { LoginProxy } from 'src/infrastructure/usecase-proxy/proxies/auth/login-usecase.proxy';
import { CreateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/create-user-usecase.proxy';
import { LoginUseCase } from 'src/usecase/auth/login.usecase';
import { CreateUserUseCase } from 'src/usecase/user/create-user.usecase';
import { LoginPresenter } from './presenter/login.presenter';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { IAuthResult } from 'src/domain/service/auth/auth-result.interface';

@Resolver('auth')
export class AuthResolver {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly httpExceptionService: HttpExceptionService,
    @Inject(LoginProxy.Token)
    private readonly loginUseCase: LoginUseCase,
    @Inject(CreateUserProxy.Token)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Mutation()
  public async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginPresenter> {
    return this.loginUseCase.login({ email, password });
  }

  @Mutation()
  public async register(
    @Args('createUserDto', ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<IAuthResult> {
    const { user: createdUser } =
      await this.createUserUseCase.run(createUserDto);

    const loginResult = await this.loginUseCase.login(createUserDto);

    return {
      user: createdUser,
      token: loginResult.token,
    };
  }
}
