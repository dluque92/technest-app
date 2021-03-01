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

    async getRandomAccountBalance(): Promise<Account> {
        const accounts = await this.getAccounts();
        const randomIndex = Math.floor(Math.random() * (accounts.length-1));
        const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        const randomBalance = plusOrMinus * Math.random();
        const account = accounts[randomIndex];

        account.balance += randomBalance;
        account.availableBalance += randomBalance;

        const { _id, ...res } = account;
        
        return res;
    }
}
