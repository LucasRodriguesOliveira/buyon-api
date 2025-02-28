import { Module } from '@nestjs/common';
import { ResolverModule } from './infrastructure/resolver/resolver.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './infrastructure/config/env/env.config';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './infrastructure/config/pino/pino.config';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { HttpExceptionModule } from './infrastructure/http-exception/http-exception.module';
import { LoggerModule as CustomLoggerModule } from './infrastructure/logger/logger.module';
import { JwtStrategyProvider } from './infrastructure/common/strategy/jwt/jwt.provider';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { graphqlConfig } from './infrastructure/config/graphql/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    LoggerModule.forRootAsync(pinoConfig()),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    ResolverModule,
    UsecaseProxyModule.register(),
    HttpExceptionModule,
    CustomLoggerModule,
  ],
  controllers: [],
  providers: [JwtStrategyProvider],
})
export class AppModule {}
