import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { IFormatExceptionMessage } from 'src/domain/exception/http-exception.interface';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { Path } from 'graphql/jsutils/Path';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const { path } = gqlHost.getInfo<GraphQLResolveInfo>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let result: IFormatExceptionMessage;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      result = exception.getResponse() as IFormatExceptionMessage;
    } else {
      result = {
        message: exception.message,
        errCode: null,
      };
    }
    this.logMessage(path, result, status, exception);

    return exception;
  }

  private logMessage(
    path: Path,
    message: IFormatExceptionMessage,
    status: number,
    exception: HttpException | Error,
  ) {
    if (HttpStatus.INTERNAL_SERVER_ERROR === status) {
      this.logger.error(
        `End Request for ${path.key}`,
        `method=${path.typename} status=${status} errCode=${message.errCode ?? null} message=${message.message ?? null}`,
        exception.stack,
      );
      return;
    }

    this.logger.warn(
      `End Request for ${path.key}`,
      `method=${path.typename} status=${status} errCode=${message.errCode ?? null} message=${message.message ?? null}`,
    );
  }
}
