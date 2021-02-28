export interface CurrentExchange {
    USD: number;
}

export interface Account {
    accountName: string;
    category: string;
    tags: string;
    balance: number;
    availableBalance: number;
}

export type QueryCurrentExchange = {
    exchange: CurrentExchange;
}
