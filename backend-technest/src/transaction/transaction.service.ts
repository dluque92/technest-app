import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';

import { Transaction } from './transaction.entity';
import { CreateTransactionInput } from './transaction.input';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>
    ) { }

    async getTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
        return this.transactionRepository.find({ accountId });
    }

    async createTransaction(createTransactionInput: CreateTransactionInput): Promise<Transaction> {
        const { accountId, transactionType, debit, credit, balance } = createTransactionInput;
        const transaction = this.transactionRepository.create({
            balance,
            accountId,
            debit,
            credit,
            transactionType,
            id: uuid(),
            orderId: uuid(),
            orderCode: uuid(),
            confirmedDate: new Date().toISOString()
        });

        return this.transactionRepository.save(transaction);
    }
}
