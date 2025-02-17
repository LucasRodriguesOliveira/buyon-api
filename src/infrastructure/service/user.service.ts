import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IGrpcUserService } from '../grpc/service/user/user-service.grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { Result } from 'src/domain/types/result';
import { IUserResult } from '../../domain/service/user/user-result.interface';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { firstValueFrom } from 'rxjs';
import { IUserService } from 'src/domain/service/user/user-service.interface';

@Injectable()
export class UserService implements OnModuleInit, IUserService {
  private grpcUserService: IGrpcUserService;

  constructor(
    @Inject('__AUTH_PACKAGE__')
    private readonly clientGrpc: ClientGrpc,
  ) {}

  onModuleInit() {
    this.grpcUserService =
      this.clientGrpc.getService<IGrpcUserService>('UserService');
  }

  public async findByEmail(
    email: string,
  ): Promise<Result<IUserResult, ErrorResponse>> {
    return firstValueFrom(this.grpcUserService.findByEmail({ email }));
  }
}
