import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class Interceptor implements NestInterceptor {
  private internalMagicNumber: number;
  private magicNumber: number;

  constructor(
    private readonly modRef: ModuleRef,
  ) {
    this.internalMagicNumber = Math.random();
  }

  async intercept(context: ExecutionContext, next: CallHandler) {
    const contextId = ContextIdFactory.getByRequest(this.getRequest(context));
    this.magicNumber = await this.modRef.resolve<number>(Symbol.for('MagicNumber'), contextId);
    console.log('Interceptor: ', this.magicNumber, this.internalMagicNumber);
    return next.handle();
  }

  getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }
    const gql = GqlExecutionContext.create(context);
    return gql.getContext().req;
  }
}
