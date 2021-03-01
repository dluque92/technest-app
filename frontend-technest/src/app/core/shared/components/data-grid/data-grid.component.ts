import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DataProviderService } from 'src/app/services/data-provider.service';
import { DataGridColumn, Account, CurrentExchange, AccountTransaction, BalanceType } from 'src/app/core/interfaces/common.interface';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Account | AccountTransaction>;

  currentExchangeUSD: number = 0;
  pageSizeOptions = [10, 20, 50, 100];
  balanceProperties: string[] = ['balance', 'availableBalance'];
  bitcoinsProperties: string[] = ['balance', 'availableBalance', 'debit', 'credit'];

  get displayColumns(): string[] {
    return this.columns.map((column: DataGridColumn) => column.name);
  }

  @Input() data: Account[] | AccountTransaction[] = [];
  @Input() dataUpdated: Account | AccountTransaction | null = null;
  @Input() columns: DataGridColumn[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private dataProviderService: DataProviderService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.initCurrentExchangeSubscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.dataSource.data = changes.data.currentValue;
    }

    if (changes.dataUpdated?.currentValue) {
      this.updateCurrentData(changes.dataUpdated.currentValue);
    }
  }

  ngAfterViewInit() {
    if (this.paginator) { this.dataSource.paginator = this.paginator; }
    if (this.sort) { this.dataSource.sort = this.sort; }
  }

  getColumnData(row: any, propertieName: string): string {
    if (this.bitcoinsProperties.includes(propertieName)) {
      return [
        `${row[propertieName]} BTC`,
        `$${(row[propertieName] * this.currentExchangeUSD).toFixed(2)}`
      ].join('<br />');
    } else {
      return row[propertieName];
    }
  }

  isLowerBalance(account: Account | AccountTransaction, propertieName: string): boolean {
    return this.balanceProperties.includes(propertieName) && account.balanceChange === BalanceType.LOWER;
  }

  isHigherBalance(account: Account | AccountTransaction, propertieName: string): boolean {
    return this.balanceProperties.includes(propertieName) && account.balanceChange === BalanceType.HIGHER;
  }

  private initCurrentExchangeSubscription(): void {
    this.dataProviderService.currentExchange
      .subscribe((currentExchange: CurrentExchange) => {
        this.currentExchangeUSD = currentExchange.USD;
      })
  }

  private updateCurrentData(dataUpdated: Account): void {
    const index = this.dataSource.data.findIndex((data: Account | AccountTransaction) => data.id === dataUpdated.id);
    const item = this.dataSource.data[index];

    item.balanceChange = item.balance < dataUpdated.balance ?
      BalanceType.HIGHER :
      item.balance > dataUpdated.balance ? BalanceType.LOWER : BalanceType.SAME;

    item.balance = dataUpdated.balance;

    if (item.availableBalance) {
      item.availableBalance = dataUpdated.availableBalance;
    }
  }
}