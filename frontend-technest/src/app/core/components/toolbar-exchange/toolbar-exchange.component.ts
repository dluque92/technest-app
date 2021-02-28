import { Component, OnInit } from '@angular/core';

import { CurrentExchange } from '../../interfaces/common.interface';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-toolbar-exchange',
  templateUrl: './toolbar-exchange.component.html',
  styleUrls: ['./toolbar-exchange.component.scss']
})
export class ToolbarExchangeComponent implements OnInit {
  currentExchangeUSD: number = 0;

  constructor(
    private dataProviderService: DataProviderService
  ) { }

  ngOnInit() {
    this.initCurrentExchangeSubscription();
  }

  private initCurrentExchangeSubscription(): void {
    this.dataProviderService.currentExchange
      .subscribe((currentExchange: CurrentExchange) => {
        this.currentExchangeUSD = currentExchange.USD;
      })
  }
}
