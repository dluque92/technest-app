import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

import { Subject } from 'rxjs';

import { CurrentExchange, QueryAccounts, QueryCurrentExchange, Account } from '../core/interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  account: Subject<Account> = new Subject<Account>();
  accounts: Subject<Account[]> = new Subject<Account[]>();
  currentExchange: Subject<CurrentExchange> = new Subject<CurrentExchange>();

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
}
