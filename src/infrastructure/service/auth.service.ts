import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IAuthService } from 'src/domain/service/auth/auth-service.interface';
import { IGrpcAuthService } from '../grpc/service/auth/auth-service.grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { UserModel } from 'src/domain/model/user.model';
import { IAuthResult } from 'src/domain/service/auth/auth-result.interface';
import { ErrorResponse } from 'src/domain/types/error.interface';
import { Result } from 'src/domain/types/result';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit, IAuthService {
  private grpcAuthService: IGrpcAuthService;

  constructor(
    @Inject('__AUTH_PACKAGE__')
    private readonly clientGrpc: ClientGrpc,
  ) {}

  onModuleInit() {
    this.grpcAuthService =
      this.clientGrpc.getService<IGrpcAuthService>('AuthService');
  }

  public async login({
    email,
    password,
  }: Partial<UserModel>): Promise<Result<IAuthResult, ErrorResponse>> {
    return firstValueFrom(this.grpcAuthService.login({ email, password }));
  }

  public async register(
    _userData: Partial<UserModel>,
  ): Promise<Result<IAuthResult, ErrorResponse>> {
    console.log(_userData);
    return {};
  }
}
