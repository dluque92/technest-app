import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreateAccountInput {
    @MinLength(1)
    @Field()
    accountName: string;

    @MinLength(1)
    @Field()
    category: string;

    @MinLength(1)
    @Field()
    tag: string;

    @IsNumber()
    @Field(() => Number, { defaultValue: 0 })
    balance: number;

    @IsNumber()
    @Field(() => Number, { defaultValue: 0 })
    availableBalance: number;
}