import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DataProviderService } from './services/data-provider.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    translateService: TranslateService,
    dataProviderService: DataProviderService,
    protected websocketService: WebsocketService
  ) {
    const langs = ['en', 'es'];
    const [defaultLang] = langs;

    translateService.addLangs(langs);
    translateService.setDefaultLang(defaultLang);
    translateService.use(defaultLang);

    dataProviderService.initCurrentExchangeSubscription();
  }
}
