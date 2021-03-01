import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {

    constructor(
        private translateService: TranslateService
    ) {
        super();

        this.initLangChangSubscription();
        this.getTranslations();
    }

    private getTranslations(): void {
        this.translateService.get([
            'core.shared.dataGrid.nextPage',
            'core.shared.dataGrid.previousPage',
            'core.shared.dataGrid.itemsPerPage'
        ]).subscribe((translations: any) => {
            this.nextPageLabel = translations['core.shared.dataGrid.nextPage'];
            this.previousPageLabel = translations['core.shared.dataGrid.previousPage'];
            this.itemsPerPageLabel = translations['core.shared.dataGrid.itemsPerPage'];

            this.changes.next();
        });
    }

    private initLangChangSubscription(): void {
        this.translateService.onLangChange.subscribe(() => this.getTranslations());
    }
}