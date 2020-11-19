import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class Interceptor implements NestInterceptor {
  private magicNumber: number;

  constructor(
    @Inject(Symbol.for('Test'))
    private readonly testValue: number,

    @Inject(Symbol.for('Config'))
    private readonly config: any,
  ) {
    this.magicNumber = Math.random();
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Interceptor: ', this.testValue, this.magicNumber, this.config);
    return next.handle();
  }
}
