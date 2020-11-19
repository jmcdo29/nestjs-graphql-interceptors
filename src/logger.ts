import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class Logger implements NestInterceptor {
  constructor(
    @Inject(Symbol.for('Test'))
    private readonly testValue: number,

    @Inject(Symbol.for('Config'))
    private readonly config: any,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Logger: ', this.testValue, this.config);
    return next.handle();
  }
}