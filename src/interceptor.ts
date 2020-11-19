import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class Interceptor implements NestInterceptor {
  private internalMagicNumber: number;

  constructor(
    @Inject(Symbol.for('MagicNumber'))
    private readonly magicNumber: number,
  ) {
    this.internalMagicNumber = Math.random();
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Interceptor: ', this.magicNumber, this.internalMagicNumber);
    return next.handle();
  }
}
