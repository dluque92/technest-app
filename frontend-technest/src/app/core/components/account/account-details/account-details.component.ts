import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountTransaction, BalanceType, DataGridColumn, Account, CurrentExchange } from 'src/app/core/interfaces/common.interface';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  currentExchangeUSD: number = 0;
  data: AccountTransaction[] = [];
  currentAccount: Account | null = null;
  transactionUpdated: AccountTransaction | null = null;
  columns: DataGridColumn[] = [
    {
      name: 'confirmedDate',
      title: 'core.account.accountDetails.confirmedDate'
    },
    {
      name: 'orderId',
      title: 'core.account.accountDetails.orderId'
    },
    {
      name: 'orderCode',
      title: 'core.account.accountDetails.orderCode'
    },
    {
      name: 'transactionType',
      title: 'core.account.accountDetails.transactionType'
    },
    {
      name: 'debit',
      title: 'core.account.accountDetails.debit'
    },
    {
      name: 'credit',
      title: 'core.account.accountDetails.credit'
    },
    {
      name: 'balance',
      title: 'core.account.accountDetails.balance'
    }
  ];

  constructor(
    private activatedRouter: ActivatedRoute,
    private dataProviderService: DataProviderService
  ) { }

  ngOnInit() {
    this.initAccountSubscription();
    this.initTransactionsSubscription();
    this.initCurrentExchangeSubscription();
    this.initAccountUpdatedChangeSubscription();
    this.dataProviderService.initOneAccountSubscription(this.activatedRouter.snapshot.params.id);
    this.dataProviderService.initTransactionsSubscription(this.activatedRouter.snapshot.params.id);
  }

  getCurrentBalanceInUSD(balance: number | undefined): string {
    return !!balance ? (balance * this.currentExchangeUSD).toFixed(2) : '';
  }

  isLowerBalance(): boolean {
    return this.currentAccount?.balanceChange === BalanceType.LOWER;
  }

  isHigherBalance(): boolean {
    return this.currentAccount?.balanceChange === BalanceType.HIGHER;
  }

  private initCurrentExchangeSubscription(): void {
    this.dataProviderService.currentExchange
      .subscribe((currentExchange: CurrentExchange) => {
        this.currentExchangeUSD = currentExchange.USD;
      })
  }

  private initTransactionsSubscription(): void {
    this.dataProviderService.transactions
      .subscribe((transactions: AccountTransaction[]) => {
        this.data = transactions;
      });
  }

  private initAccountSubscription(): void {
    this.dataProviderService.account
      .subscribe((account: Account) => {
        this.currentAccount = {
          ...account,
          balanceChange: BalanceType.SAME
        };
      })
  }

  private initAccountUpdatedChangeSubscription(): void {
    this.dataProviderService.accountUpdated
      .subscribe((account: Account) => {
        if (account.id === this.currentAccount?.id) {
          this.updateCurrentData(account)
        }
      })
  }

  private updateCurrentData(dataUpdated: Account): void {
    if (!this.currentAccount) { return; }

    this.currentAccount.balanceChange = this.currentAccount.balance < dataUpdated.balance ?
      BalanceType.HIGHER :
      this.currentAccount.balance > dataUpdated.balance ? BalanceType.LOWER : BalanceType.SAME;

    this.currentAccount.balance = dataUpdated.balance;

    if (this.currentAccount.availableBalance) {
      this.currentAccount.availableBalance = dataUpdated.availableBalance;
    }
  }
}
