import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

import { BehaviorSubject, Subject } from 'rxjs';

import { CurrentExchange, QueryAccounts, QueryCurrentExchange, Account, AccountTransaction, OneQueryAccount } from '../core/interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  account: Subject<Account> = new Subject<Account>();
  accountUpdated: Subject<Account> = new Subject<Account>();
  accounts: Subject<Account[]> = new Subject<Account[]>();
  transaction: Subject<AccountTransaction> = new Subject<AccountTransaction>();
  transactions: Subject<AccountTransaction[]> = new Subject<AccountTransaction[]>();
  currentExchange: BehaviorSubject<CurrentExchange> = new BehaviorSubject<CurrentExchange>({ USD: 0 });

  constructor(
    private apollo: Apollo
  ) { }

  initCurrentExchangeSubscription(): void {
    this.apollo.watchQuery<QueryCurrentExchange>({
      query: gql`
        {
          exchange {
            USD
          }
        }
      `
    })
      .valueChanges
      .subscribe((result: ApolloQueryResult<QueryCurrentExchange>) => {
        this.currentExchange.next(result.data.exchange)
      });
  }

  initAccountSubscription(): void {
    this.apollo.watchQuery<QueryAccounts>({
      query: gql`
      {
        accounts {
          id
          accountName
          category
          tag
          balance
          availableBalance
        }
      }
    `
    })
      .valueChanges
      .subscribe((result: ApolloQueryResult<QueryAccounts>) => {
        this.accounts.next(result.data.accounts)
      });
  }

  initOneAccountSubscription(accountId: string): void {
    this.apollo.watchQuery<OneQueryAccount>({
      query: gql`
      {
        account(id: "${accountId}") {
          id
          accountName
          category
          tag
          balance
          availableBalance
        }
      }
    `
    })
      .valueChanges
      .subscribe((result: ApolloQueryResult<OneQueryAccount>) => {
        this.account.next(result.data.account)
      });
  }

  initTransactionsSubscription(accountId: string): void {
    this.apollo.watchQuery<QueryAccounts>({
      query: gql`
      {
        accounts {
          id
          accountName
          category
          tag
          balance
          availableBalance
        }
      }
    `
    })
      .valueChanges
      .subscribe((result: ApolloQueryResult<QueryAccounts>) => {
        this.accounts.next(result.data.accounts)
      });
  }
}
