import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { gqlFormatError } from './format-error';

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  playground: true,
  typePaths: [join(process.cwd(), 'src/infrastructure/**/*.graphql')],
  definitions: {
    path: join(process.cwd(), 'src/graphql.ts'),
  },
  formatError: gqlFormatError,
};
