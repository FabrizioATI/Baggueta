import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { MethodsCommon } from '../../../shared/resources/app.common';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { forkJoin, Observable, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';

export interface TurnoDTO {
    name: string;
    code: string;
}

@Component({
    selector: 'cierre',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FluidModule,
        SliderModule,
        SelectModule,
        DatePickerModule,
        ButtonModule,
        IconFieldModule,
        AgGridAngular,
        TextareaModule,
        InputNumberModule,
    ],
    templateUrl: 'cierre.html',
    providers: []
})
export class Cierre implements OnInit, OnDestroy {

    constructor(
        private methodsCommon: MethodsCommon,
    ) { }

    public calendarValue: any = null;
    dropdownValues = [
        { name: 'GASTOS', code: '001' },
        { name: 'FALTANTES', code: '002' },
        { name: 'SOBRANTES', code: '003' },
        { name: 'YAPE', code: '004' },
        { name: 'PLIN', code: '005' },
        { name: 'POS', code: '006' }
    ];

    dropdownValue: any = null;

    public gridApiGrupo!: GridApi;
    public gridOptionsGrupo!: GridOptions;
    public rowDataGrupo: any[] = [];

    public gridApiTipo!: GridApi;
    public gridOptionsTipo!: GridOptions;
    public rowDataTipo: any[] = [];

    public gridApiSeccion!: GridApi;
    public gridOptionsSeccion!: GridOptions;
    public rowDataSeccion: any[] = [];

    private destroy$ = new Subject<void>();

    public formCierreComponent: FormGroup = new FormGroup({});

    ngOnInit() {
        this.configurarComponente();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    public crearFormulario() {
        this.formCierreComponent = new FormGroup({
            tipo: new FormControl(),
            monto: new FormControl(),
            descripcion: new FormControl()
        });
    }

    public async configurarComponente() {
        this.crearFormulario();
        await this.configureGridGrupo();
        await this.configureGridTipo();
        await this.configureGridSeccion();
        
    }

    //Metodos Formulario
    public obtenerDatosServidor(): Observable<any> {
        const arrayToForkJoin: any = {};
        return forkJoin(arrayToForkJoin);
    }

    public asignarValoresFormulario(respuestaServidor: any) {
        this.gridApiGrupo.setGridOption("rowData", this.rowDataGrupo);
        this.gridApiTipo.setGridOption("rowData", this.rowDataTipo);
        this.gridApiSeccion.setGridOption("rowData", this.rowDataSeccion);
    }

    //Metodos Grilla Grupo
    public async configureGridGrupo() {
        const columnDefs: ColDef[] = [
            { field: "Id", hide: true },
            { field: "Grupo" },
            { field: "Producto" },
            { field: "Precio" },
            { field: "Stock" },
            { field: "Ingreso" },
            { field: "Transferencia" },
            { field: "Perdida" },
            { field: "CantidadVendida" },
            { field: "MontoVendido" },
            { field: "Saldo" }
        ];

        const defaultColDef: ColDef = {
            resizable: true,
            floatingFilter: true,
            editable: true
        };

        this.gridOptionsGrupo = this.methodsCommon.createGridOptionsGenerico();
        this.gridOptionsGrupo.columnDefs = columnDefs;
        this.gridOptionsGrupo.defaultColDef = defaultColDef;
        this.gridOptionsGrupo.context = { componentParent: this };
        this.gridOptionsGrupo.components = {};
        this.gridOptionsGrupo.onGridReady = this.onGridReadyGrupo;
    }

    public onGridReadyGrupo = (params: any) => {
        this.gridApiGrupo = params.api;
        this.rowDataGrupo = [
            {
                Id: 1,
                Grupo: "EMBOLSADOS",
                Producto: "PAQ. TOSTADA BLANCA X 12",
                Precio: 4.0,
                Stock: 100,
                Ingreso: 20,
                Transferencia: 5,
                Perdida: 2,
                CantidadVendida: 50,
                MontoVendido: 200.0,
                Saldo: 63
            },
            {
                Id: 2,
                Grupo: "EMBOLSADOS",
                Producto: "TOSTADA INTEGRAL X 12",
                Precio: 4.5,
                Stock: 80,
                Ingreso: 15,
                Transferencia: 3,
                Perdida: 1,
                CantidadVendida: 40,
                MontoVendido: 180.0,
                Saldo: 51
            }
        ];

    };

    //Metodos Grilla Tipo
    public async configureGridTipo() {
        const columnDefs: ColDef[] = [
            { field: "Id", hide: true },
            { field: "Tipo" },
            { field: "Descripcion" },
            { field: "Monto" }
        ];

        const defaultColDef: ColDef = {
            resizable: true,
            floatingFilter: true,
            editable: true
        };

        this.gridOptionsTipo = this.methodsCommon.createGridOptionsGenerico();
        this.gridOptionsTipo.columnDefs = columnDefs;
        this.gridOptionsTipo.defaultColDef = defaultColDef;
        this.gridOptionsTipo.context = { componentParent: this };
        this.gridOptionsTipo.components = {};
        this.gridOptionsTipo.onGridReady = this.onGridReadyTipo;
    }

    public onGridReadyTipo = (params: any) => {
        this.gridApiTipo = params.api;
        this.rowDataTipo = [
            {
                Id: 1,
                Tipo: "YAPE",
                Descripcion: "YAPE PARA EL TAXI",
                Monto: 4.0
            },
            {
                Id: 2,
                Tipo: "PLIN",
                Descripcion: "PLIN PARA LAS BOLSAS",
                Monto: 4.0
            }
        ];

    };

    //Metodos Grilla Seccion
    public async configureGridSeccion() {
        const columnDefs: ColDef[] = [
            { field: "Id", hide: true },
            { field: "Seccion" },
            { field: "Total" }
        ];

        const defaultColDef: ColDef = {
            resizable: true,
            floatingFilter: true,
            editable: true
        };

        this.gridOptionsSeccion = this.methodsCommon.createGridOptionsGenerico();
        this.gridOptionsSeccion.columnDefs = columnDefs;
        this.gridOptionsSeccion.defaultColDef = defaultColDef;
        this.gridOptionsSeccion.context = { componentParent: this };
        this.gridOptionsSeccion.components = {};
        this.gridOptionsSeccion.onGridReady = this.onGridReadySeccion;
    }

    public onGridReadySeccion = (params: any) => {
        this.gridApiSeccion = params.api;
        this.rowDataSeccion = [
            {
                Id: 1,
                Seccion: "EMBOLSADOS",
                Total: 4.0,
            },
            {
                Id: 2,
                Seccion: "EMBOLSADOS",
                Total: 4.0,
            }
        ];

    };

    public agregar() {
        const tipo = this.formCierreComponent.get('tipo')?.value as TurnoDTO;
        const monto = this.formCierreComponent.get('monto')?.value;
        const descripcion = this.formCierreComponent.get('descripcion')?.value;
        
        if (!this.gridApiTipo) return;

        const nuevaFila = {
            Id: this.rowDataTipo.length + 1,
            Tipo: tipo.name,
            Descripcion: descripcion,
            Monto: monto
        };

        this.gridApiTipo.applyTransaction({ add: [nuevaFila] });
    }
}

