import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/domain/auth/jwt/jwt-payload.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { JWT_CONFIGTOKEN } from 'src/infrastructure/config/env/token.config';
import { TokenConfig } from 'src/infrastructure/config/types/token.interface';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { FindUserByEmailUseCase } from 'src/usecase/user/find-user-by-email.usecase';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly configService: ConfigService,
    private readonly logger: ILogger,
    private readonly httpExceptionService: HttpExceptionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<TokenConfig>(JWT_CONFIGTOKEN.description)
        .secret,
    });
  }

  public async validate(payload: JwtPayload) {
    const result = await this.findUserByEmailUseCase.run(payload.email);

    if (result.error) {
      this.logger.warn(JwtStrategy.name, result.error.message);
      this.httpExceptionService.unauthorized({
        message: 'User not found',
      });
    }

    return result.value;
  }
}
