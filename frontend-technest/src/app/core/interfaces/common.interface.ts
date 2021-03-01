export interface CurrentExchange {
    USD: number;
}

export interface Account {
    id: string;
    accountName: string;
    category: string;
    tag: string;
    balance: number;
    availableBalance: number;
    balanceChange?: BalanceType;
}

export interface AccountTransaction {
    id: string;
    accountId: string;
    confirmedDate: string;
    orderId: string;
    orderCode: string;
    transactionType: string;
    debit: number;
    credit: number;
    balance: number;
    availableBalance?: number;
    balanceChange?: BalanceType;
}

export interface DataGridColumn {
    name: string;
    title: string;
}

export type QueryCurrentExchange = {
    exchange: CurrentExchange;
}

export type QueryAccounts = {
    accounts: Account[];
}

export type OneQueryAccount = {
    account: Account;
}

export enum BalanceType {
    LOWER = "LOWER",
    HIGHER = "HIGHER",
    SAME = "SAME"
}
