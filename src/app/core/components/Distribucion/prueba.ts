import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MethodsCommon } from '../../../shared/resources/app.common';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-administrador-empresa-busqueda',
    templateUrl: './empresaBusqueda.component.html',
    providers: [MethodsCommon]
})
export class EmpresaBusquedaComponent implements OnInit, OnDestroy {

    constructor(
        private methodsCommon: MethodsCommon,
    ) { }

    public gridApi!: GridApi;
    public gridOptions!: GridOptions;
    public rowData: any[] = [];

    private destroy$ = new Subject<void>();

    public formEmpresaBusquedaComponent: FormGroup = new FormGroup({
        fechaRegistro: new FormControl(),
        turnoRegistro: new FormControl()
    });

    ngOnInit() {
        this.configurarComponente();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public crearFormulario() {
        this.formEmpresaBusquedaComponent = new FormGroup({});
    }

    public async configurarComponente() {
        this.crearFormulario();
        await this.configureGrid();
        this.obtenerDatosServidor().pipe(
            takeUntil(this.destroy$)
        ).subscribe(respuestaServidor => {
            this.asignarValoresFormulario(respuestaServidor);
        });
    }

    public obtenerDatosServidor(): Observable<any> {
        const arrayToForkJoin: any = {};
        return forkJoin(arrayToForkJoin);
    }

    public asignarValoresFormulario(respuestaServidor: any) { }

    public nuevo() { }

    public async configureGrid() {
        const columnDefs: ColDef[] = [
            {
                hide: false,
                headerName: "Acciones",
                filter: false,
                sortable: false,
                suppressHeaderMenuButton: true,
                resizable: false,
                cellRendererParams: {
                    visibilidadEditar: function (data: any) {
                        return true;
                    },
                    visibilidadEliminar: function (data: any) {
                        return true;
                    },
                    nombreGrilla: "myGrid",
                },
            },
            {
                headerName: "Nombre",
                flex: 1,
                field: "nombre",
                sortable: true,
                filter: true,
                filterParams: {},
            },
            {
                headerName: "Dirección",
                flex: 1,
                field: "direccion",
                sortable: true,
                filter: true,
                filterParams: {},
            },
            {
                headerName: "Ruc",
                flex: 1,
                field: "ruc",
                sortable: true,
                filter: true,
                filterParams: {},
            }
        ];

        const defaultColDef: ColDef = {
            resizable: true,
            floatingFilter: true
        };

        this.gridOptions = this.methodsCommon.createGridOptionsGenerico();
        this.gridOptions.columnDefs = columnDefs;
        this.gridOptions.defaultColDef = defaultColDef;
        this.gridOptions.context = { componentParent: this };
        this.gridOptions.components = {};
        this.gridOptions.onGridReady = this.onGridReady;
    }

    public onGridReady = (params: any) => {
        this.gridApi = params.api;
        this.rowData = [];
    };
}
