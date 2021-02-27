import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Exchange')
export class ExchangeType {
    @Field()
    USD: number;
}