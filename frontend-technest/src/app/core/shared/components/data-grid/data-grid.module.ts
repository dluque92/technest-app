import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';

import { DataGridComponent } from './data-grid.component';
import { CustomPaginator } from './custom-paginator';

@NgModule({
  declarations: [DataGridComponent],
  imports: [
    CommonModule,
    TranslateModule,

    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginator
    }
  ],
  exports: [
    DataGridComponent
  ]
})
export class DataGridModule { }
