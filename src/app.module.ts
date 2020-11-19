import { Module, Scope } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Interceptor } from './interceptor';
import { Logger } from './logger';

import { CoreModule } from './core.module';
import { MyResolver } from './resolve'
import { join } from 'path';

@Module({
  imports: [
    CoreModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MyResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: Interceptor,
      scope: Scope.REQUEST
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: Logger,
      scope: Scope.REQUEST
    },
  ],
})
export class AppModule {}
