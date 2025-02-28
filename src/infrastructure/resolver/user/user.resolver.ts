import {
  Inject,
  ParseUUIDPipe,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/infrastructure/common/guard/gql-jwt.guard';
import { FindUserByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/user/find-user-by-id.proxy';
import { FindUserByIdUseCase } from 'src/usecase/user/find-user-by-id.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/create-user-usecase.proxy';
import { CreateUserUseCase } from 'src/usecase/user/create-user.usecase';
import { UserModel } from 'src/domain/model/user.model';
import { ListUsersProxy } from 'src/infrastructure/usecase-proxy/proxies/user/list-users.proxy';
import { ListUsersUseCase } from 'src/usecase/user/list-users.usecase';
import { UpdateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/update-user.proxy';
import { UpdateUserUseCase } from 'src/usecase/user/update-user.usecase';
import { DeleteUserByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/user/delete-user-by-id.proxy';
import { DeleteUserByIdUseCase } from 'src/usecase/user/delete-user-by-id.usecase';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject(FindUserByIdProxy.Token)
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(CreateUserProxy.Token)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(ListUsersProxy.Token)
    private readonly listUsersUseCase: ListUsersUseCase,
    @Inject(UpdateUserProxy.Token)
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject(DeleteUserByIdProxy.Token)
    private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
  ) {}

  @Query('findUserById')
  @UseGuards(GqlAuthGuard)
  public async findById(@Args('id') id: string) {
    return this.findUserByIdUseCase.run(id);
  }

  @Query('listUser')
  @UseGuards(GqlAuthGuard)
  public async list(): Promise<UserModel[]> {
    return this.listUsersUseCase.run();
  }

  @Mutation('createUser')
  @UseGuards(GqlAuthGuard)
  public async create(
    @Args('createUserDto', ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserModel> {
    const { user } = await this.createUserUseCase.run(createUserDto);

    return user;
  }

  @Mutation('updateUser')
  @UseGuards(GqlAuthGuard)
  public async update(
    @Args('userId', ParseUUIDPipe) userId: string,
    @Args('updateUserDto', ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.updateUserUseCase.run(userId, updateUserDto);
  }

  @Mutation('deleteUser')
  @UseGuards(GqlAuthGuard)
  public async delete(
    @Args('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserModel> {
    return this.deleteUserByIdUseCase.run(userId);
  }
}
