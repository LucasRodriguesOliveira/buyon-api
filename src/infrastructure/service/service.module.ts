import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../config/grpc/grpc.config';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: '__AUTH_PACKAGE__',
        ...grpcClientOptions,
      },
    ]),
  ],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
})
export class ServiceModule {}
