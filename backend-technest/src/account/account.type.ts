import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Account')
export class AccountType {
    @Field(type => ID)
    id: string;

    @Field()
    accountName: string;

    @Field()
    category: string;

    @Field()
    tag: string;

    @Field()
    balance: number;

    @Field()
    availableBalance: number;
}