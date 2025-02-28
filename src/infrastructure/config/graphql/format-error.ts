import { HttpException } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';

export const gqlFormatError = (
  fmtError: GraphQLFormattedError,
  original: HttpException,
): GraphQLFormattedError => {
  return {
    message: original.message,
  };
};
