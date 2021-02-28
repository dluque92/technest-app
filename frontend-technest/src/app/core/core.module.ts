import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AccountListComponent } from './components/account/account-list/account-list.component';
import { AccountDetailsComponent } from './components/account/account-details/account-details.component';
import { ToolbarExchangeComponent } from './components/toolbar-exchange/toolbar-exchange.component';

import { DataGridModule } from './shared/components/data-grid/data-grid.module';

const routes: Routes = [
  {
    path: '',
    component: ToolbarExchangeComponent,
    children: [
      {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'full'
      },
      {
        path: 'accounts',
        component: AccountListComponent
      },
      {
        path: 'accounts/:id',
        component: AccountDetailsComponent
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

    RouterModule.forChild(routes),

    DataGridModule,

    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class CoreModule { }
