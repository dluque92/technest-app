
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

import { Subject } from 'rxjs';

import { CurrentExchange, QueryCurrentExchange } from '../core/interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  currentExchange: Subject<CurrentExchange> = new Subject<CurrentExchange>();

  constructor(
    private apollo: Apollo
  ) {}

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
}
