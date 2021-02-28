import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AccountListComponent } from './components/account/account-list/account-list.component';
import { AccountDetailsComponent } from './components/account/account-details/account-details.component';
import { ToolbarExchangeComponent } from './components/toolbar-exchange/toolbar-exchange.component';

const routes: Routes = [
  {
    path: '',
    component: ToolbarExchangeComponent,
    children: [
      {
        path: 'accounts',
        component: AccountListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AccountListComponent,
    AccountDetailsComponent,
    ToolbarExchangeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,

    RouterModule.forChild(routes)
  ]
})
export class CoreModule { }
