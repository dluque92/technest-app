import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Transaction')
export class TransactionType {
    @Field(type => ID)
    id: string;

    @Field(type => ID)
    accountId: string;

    @Field()
    confirmedDate: string;

    @Field()
    orderId: string;

    @Field()
    orderCode: string;

    @Field()
    transactionType: string;

    @Field()
    debit: number;

    @Field()
    credit: number;

    @Field()
    balance: number;
}