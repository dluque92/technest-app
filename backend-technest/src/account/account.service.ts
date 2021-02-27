import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';

import { Account } from './account.entity';
import { CreateAccountInput } from './account.input';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private accountRepossitory: Repository<Account>
    ) {}

    async getAccount(id: string): Promise<Account> {
        return this.accountRepossitory.findOne({ id });
    }

    async getAccounts(): Promise<Account[]> {
        return this.accountRepossitory.find();
    }

    async createAccount(createAccountInput: CreateAccountInput): Promise<Account> {
        const { accountName, tag, category, balance, availableBalance } = createAccountInput;
        const account = this.accountRepossitory.create({
            id: uuid(),
            tag,
            balance,
            category,
            accountName,
            availableBalance
        });

        return this.accountRepossitory.save(account);
    }
}
