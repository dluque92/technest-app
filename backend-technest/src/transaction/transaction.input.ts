import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CreateTransactionInput {
    @IsUUID("4", { each: true })
    @Field()
    accountId: string;

    @Field()
    transactionType: string;

    @IsNumber()
    @Field(() => Number, { defaultValue: 0 })
    debit: number;

    @IsNumber()
    @Field(() => Number, { defaultValue: 0 })
    credit: number;

    @IsNumber()
    @Field(() => Number, { defaultValue: 0 })
    balance: number;
}