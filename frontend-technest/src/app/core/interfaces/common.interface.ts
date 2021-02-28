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
}

export interface AccountDetail {
    confirmedDate: string;
    orderId: string;
    orderCode: string;
    transactionType: string;
    debit: number;
    credit: number;
    balance: number;
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
