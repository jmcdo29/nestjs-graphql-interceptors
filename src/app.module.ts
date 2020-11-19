import { Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Interceptor } from './interceptor';
import { Logger } from './logger';

import { CoreModule } from './core.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [
    AppService,
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
