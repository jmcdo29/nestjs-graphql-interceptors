## Bug Report

## Current behavior
- Defining a global interceptor with `REQUEST` scope in a module with the Nest's GraphQL module ends up with the interceptor not being invoked.
- Defining a global interceptor with default scope and with a `REQUEST` scoped dependency ends up with the dependencies of the interceptor being `undefined` (also while running inside a module with the GraphQL module).
- When requesting the sample REST route (`GET /`) the interceptor runs fine and its dependencies are resolved correctly.
- Setting both the `Symbol.for('MagicNumber')`provider and the interceptor to the default scope makes them run correctly when doing GraphQL queries

## Input Code
<!-- REPL or Repo link if applicable: -->
Repo: https://github.com/Robfz/nestjs-graphql-interceptors

Module definition:

```ts
@Module({
  imports: [
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
      provide: Symbol.for('MagicNumber'),
      useFactory: () => Math.random(),
      scope: Scope.REQUEST,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: Interceptor,
      scope: Scope.REQUEST
    },
  ],
})
export class AppModule {}
```

Sample interceptor code: here `magicNumber` is expected to be injected by Nest's IoC container. The `internalMagicNumber` is another random number we initialize when the constructor runs. In this case, both `magicNumber` and `internalMagicNumber` are `undefined` if the scope of the interceptor is set as default. The interceptor seems to not run at all if its scope is set to `REQUEST`.

```ts
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
```

## Expected behavior
Request-scoped interceptors should run and have their dependencies resolved on GraphQL requests.

## Environment

<pre><code>
Nest version: 7.5.4
GraphQL module version: 7.8.2
</code></pre>