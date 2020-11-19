import { Module, Scope } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: Symbol.for('IntermediateDep'),
      useClass: class Test {}
    },
    {
      provide: Symbol.for('Config'),
      useValue: {
        environment: 'testing',
      }
    },
    {
      provide: Symbol.for('Test'),
      useFactory: async (dep: any) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return Math.random();
      },
      inject: [Symbol.for('IntermediateDep')],
      scope: Scope.REQUEST,
    }
  ],
  exports: [Symbol.for('Test'), Symbol.for('Config')],
})
export class CoreModule {}
