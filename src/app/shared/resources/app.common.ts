// src/app/shared/resources/app.common.ts
import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'   // ✅ Angular ya lo podrá inyectar en cualquier componente
})
export class MethodsCommon {
    constructor() {}

    public createGridOptionsGenerico() {
        var gridOptions: GridOptions = {
            debug: false,
            animateRows: true,
            suppressNoRowsOverlay: true,
            //rowSelection: this.singleRowSelection,
            pagination: true,
            paginationAutoPageSize: true,
            // localeText: this.changeLanguajeAG(),
            // icons: this.getIconsGrid()
        };
        return gridOptions;
    }
}
