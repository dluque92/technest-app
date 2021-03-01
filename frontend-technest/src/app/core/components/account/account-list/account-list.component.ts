import { Component, OnInit } from '@angular/core';
import { DataGridColumn, Account, BalanceType } from 'src/app/core/interfaces/common.interface';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  data: Account[] = [];
  accountUpdated: Account | null = null;
  columns: DataGridColumn[] = [
    {
      name: 'accountName',
      title: 'core.account.accountList.accountName'
    },
    {
      name: 'category',
      title: 'core.account.accountList.category'
    },
    {
      name: 'tags',
      title: 'core.account.accountList.tags'
    },
    {
      name: 'balance',
      title: 'core.account.accountList.balance'
    },
    {
      name: 'availableBalance',
      title: 'core.account.accountList.availableBalance'
    },
  ]

  constructor(
    private dataProviderService: DataProviderService
  ) { }

  ngOnInit() {
    this.initAccountsSubscription();
    this.initAccountChangeSubscription();
    this.dataProviderService.initAccountSubscription();
  }

  private initAccountsSubscription(): void {
    this.dataProviderService.accounts
      .subscribe((accounts: Account[]) => {
        this.data = accounts.map(
          (account: Account) => {
            return {
              ...account,
              balanceChange: BalanceType.SAME
            }
          });
      });
  }

  private initAccountChangeSubscription(): void {
    this.dataProviderService.account
      .subscribe((account: Account) => {
        this.accountUpdated = account;
      })
  }
}
