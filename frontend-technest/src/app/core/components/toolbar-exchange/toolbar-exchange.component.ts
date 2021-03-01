import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CurrentExchange } from '../../interfaces/common.interface';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-toolbar-exchange',
  templateUrl: './toolbar-exchange.component.html',
  styleUrls: ['./toolbar-exchange.component.scss']
})
export class ToolbarExchangeComponent implements OnInit {
  currentExchangeUSD: string = '';

  constructor(
    private translateService: TranslateService,
    private dataProviderService: DataProviderService
  ) { }

  ngOnInit() {
    this.initCurrentExchangeSubscription();
  }

  changeCurrentLanguage(): void {
    const langs = this.translateService.getLangs();
    const currentLang = this.translateService.currentLang;
    const index = langs.findIndex((lang: string) => lang !== currentLang)

    this.translateService.use(langs[index]);
    this.translateService.setDefaultLang(langs[index]);
  }

  private initCurrentExchangeSubscription(): void {
    this.dataProviderService.currentExchange
      .subscribe((currentExchange: CurrentExchange) => {
        this.currentExchangeUSD = currentExchange.USD.toFixed(2);
      })
  }
}
