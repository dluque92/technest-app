import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TransactionType } from './transaction.type';
import { TransactionService } from './transaction.service';
import { CreateTransactionInput } from './transaction.input';

@Resolver(of => TransactionType)
export class TransactionResolver {
    constructor(
        private transactionService: TransactionService
    ) { }

    @Query(returns => [TransactionType])
    async transactions(
        @Args('id') id: string
    ) {
        return this.transactionService.getTransactionsByAccountId(id);
    }

    @Mutation(returns => TransactionType)
    createTransaction(
        @Args('createTransactionInput') createTransactionInput: CreateTransactionInput
    ) {
        return this.transactionService.createTransaction(createTransactionInput);
    }
}
