import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MyResolver {
  @Query('myValue')
  public myValue() {
    return 1.0;
  }
}
