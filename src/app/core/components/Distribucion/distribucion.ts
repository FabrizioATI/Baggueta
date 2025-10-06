import { FluidModule } from 'primeng/fluid';
import { TextareaModule } from 'primeng/textarea';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { CustomerService } from '../service/customer.service';
import { ProductService } from '../service/product.service';
import { TabsModule } from 'primeng/tabs';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AgGridAngular } from 'ag-grid-angular';
import { MethodsCommon } from '../../../shared/resources/app.common';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { forkJoin, Observable, Subject } from 'rxjs';
import { DistribucionService } from "../../../shared/resources/distribucion.service";
import { VentaKardexService } from "../../../shared/resources/ventaKardex.service";

export interface TurnoDTO {
    name: string;
    code: string;
}

@Component({
    selector: 'distribucion',
    standalone: true,
    imports: [
        InputTextModule,
        FluidModule,
        FormsModule,
        TextareaModule,
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        TabsModule,
        DatePickerModule,
        ButtonGroupModule,
        SplitButtonModule,
        AgGridAngular,
        ReactiveFormsModule
    ],
    templateUrl: 'distribucion.html',
    styleUrl: 'distribucion.scss',
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class Distribucion implements OnInit, OnDestroy {

    constructor(
        private methodsCommon: MethodsCommon,
        private distribucionService: DistribucionService,
        private ventaKardexService: VentaKardexService
    ) { }

    public dropdownValue: any = null;
    public value = 0;
    public calendarValue: any = null;
    public mostrarGuardar: boolean = false;
    public mostrarCancelar: boolean = false;
    public fechaSeleccionada: string = '';
    public turnoSeleccionado: string = '';
    public fechaRegistro: Date | null = null;
    public turnoRegistro: TurnoDTO | null = null;
    public cambiosPendientes: any[] = [];
    public editadosCantidad: any[] = [];
    public idIncorrectos: any[] = [];

    public gridOptions!: GridOptions;
    public gridApi!: GridApi;
    public rowData: any[] = [];

    private destroy$ = new Subject<void>();

    public formDistribucionComponent: FormGroup = new FormGroup({});

    ngOnInit() {
        this.configurarComponente();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    public dropdownValues: TurnoDTO[] = [
        { name: 'AM', code: '001' },
        { name: 'PM', code: '002' },
    ];

    public crearFormulario() {
        this.formDistribucionComponent = new FormGroup({
            fechaRegistro: new FormControl(),
            turnoRegistro: new FormControl()
        });
    }

    public async configurarComponente() {
        this.crearFormulario();
        await this.configureGrid();
    }

    //Metodos Formulario
    public obtenerDatosServidor(): Observable<any> {
        const arrayToForkJoin: any = {};
        return forkJoin(arrayToForkJoin);
    }

    public asignarValoresFormulario(respuestaServidor: any) {
        this.gridApi.setGridOption("rowData", this.rowData);
    }

    //Metodos Grilla
    public async configureGrid() {
        const columnDefs: ColDef[] = [
            { field: "codLocalAvion", headerName: "Cod. Local Avión", editable: false, hide: true },
            { field: "codLocalUmacollo", headerName: "Cod. Local Umacollo", editable: false, hide: true },
            { field: "codLocalMetropolitano", headerName: "Cod. Local Metropolitano", editable: false, hide: true },
            { field: "codLocalLambramani", headerName: "Cod. Local Lambramani", editable: false, hide: true },
            { field: "codLocalFeria", headerName: "Cod. Local Feria", editable: false, hide: true },
            { field: "codLocalMarianoMelgar", headerName: "Cod. Local M. Melgar", editable: false, hide: true },
            { field: "codLocalSantaRosa", headerName: "Cod. Local Santa Rosa", editable: false, hide: true },
            { field: "codLocalYanahuara", headerName: "Cod. Local Yanahuara", editable: false, hide: true },
            { field: "codProducto", headerName: "Código Producto", editable: false, hide: true },
            { field: "area", headerName: "Área", editable: false, hide: true },
            { field: "seccion", headerName: "Sección", editable: false, hide: true },
            { field: "grupo", headerName: "Grupo", editable: false, hide: true  },
            { field: "preventa", headerName: "Preventa", editable: false, valueParser: this.numberParser, hide: true  },

            { field: "nombreGrupo", headerName: "Grupo", editable: false },
            { field: "nombreProducto", headerName: "Nombre", editable: false },
            { field: "precio", headerName: "Precio", editable: false, valueParser: this.numberParser },
            { field: "numeroUnidad", headerName: "Cantidad", editable: true, valueParser: this.numberParser },
            { field: "cantidadLambramani", headerName: "Lambramani", editable: true, valueParser: this.numberParser },
            { field: "cantidadUmacollo", headerName: "Umacollo", editable: true, valueParser: this.numberParser },
            { field: "cantidadAvion", headerName: "Avión", editable: true, valueParser: this.numberParser },
            { field: "cantidadFeria", headerName: "Feria", editable: true, valueParser: this.numberParser },
            { field: "cantidadYanahuara", headerName: "Yanahuara", editable: true, valueParser: this.numberParser },
            { field: "cantidadMetropolitano", headerName: "Metropolitano", editable: true, valueParser: this.numberParser },
            { field: "cantidadMMelgar", headerName: "M. Melgar", editable: true, valueParser: this.numberParser },
            { field: "cantidadSantaRosa", headerName: "Santa Rosa", editable: true, valueParser: this.numberParser },
            { field: "perdida", headerName: "Pérdida", editable: true, valueParser: this.numberParser },
        ];

        const defaultColDef: ColDef = {
            resizable: true,
            floatingFilter: true,
            editable: true
        };

        this.gridOptions = this.methodsCommon.createGridOptionsGenerico();
        this.gridOptions.columnDefs = columnDefs;
        this.gridOptions.defaultColDef = defaultColDef;
        this.gridOptions.context = { componentParent: this };
        this.gridOptions.components = {};
        this.gridOptions.onGridReady = this.onGridReady;
        this.gridOptions.onCellValueChanged = this.onCellValueChanged.bind(this);
    }

    public onGridReady = (params: any) => {
        this.gridApi = params.api;
        this.rowData = [];

    };

    public numberParser(params: any) {
        return Number(params.newValue);
    }

    //Metodos Distribucion
    public mostrarGrilla() {
        this.distribucionService.buscar().pipe(
        ).subscribe(respuestaApi => {
            if (!respuestaApi.mensaje.idLog || respuestaApi.mensaje.idLog === "") {
                console.log(respuestaApi.listaProductoDistribucion, respuestaApi.mensaje);
                this.rowData = respuestaApi.listaProductoDistribucion;
                this.gridApi.setGridOption("rowData", this.rowData);
            }
        });
    }

    public limpiarGrilla() {
        this.gridApi.setGridOption("rowData", this.rowData);
        this.formDistribucionComponent.reset({
            fechaRegistro: null,
            turnoRegistro: null
        });
        this.mostrarGuardar = false;
        this.mostrarCancelar = false;
    }

    public validarGrilla() {
        this.idIncorrectos = [];
        this.editadosCantidad.forEach(cambio => {
            const suma = cambio.rowData.cantidadLambramani +
                cambio.rowData.cantidadUmacollo +
                cambio.rowData.cantidadAvion +
                cambio.rowData.cantidadFeria +
                cambio.rowData.cantidadYanahuara +
                cambio.rowData.cantidadMetropolitano +
                cambio.rowData.cantidadMMelgar +
                cambio.rowData.cantidadSantaRosa
                cambio.rowData.perdida;

            const id = cambio.rowData.id;
            const total = cambio.rowData.numeroUnidad;
            if (total != suma) {
                this.idIncorrectos.push(id)
            }
        });

        if (this.idIncorrectos.length == 0) {
            this.mostrarGuardar = true;
            this.mostrarCancelar = true;
        }
        else {
            const idsString = this.idIncorrectos.join(", ");
            console.info(`Los valores ${idsString} no cuadran con la cantidad.`);
            this.mostrarGuardar = false;
            this.mostrarCancelar = false;
        }

    }

    public guardarDistribucion() {
        this.mostrarGuardar = false;
        this.mostrarCancelar = false;
    }

    public cancelarDistribucion() {
        this.mostrarGuardar = false;
        this.mostrarCancelar = false;
    }

    public filtrarSinCeros() {
        if (this.gridApi) {
            const filteredData = this.rowData.filter(row =>
                row.Cantidad != 0
            );

            this.gridApi.setGridOption("rowData", filteredData);
        }
    }

    public onCellValueChanged(event: any) {
        // Buscar si ya existe un cambio para esta fila
        const index = this.editadosCantidad.findIndex(
            item => item.rowIndex === event.rowIndex
        );

        const nuevoCambio = {
            rowIndex: event.rowIndex,     // número de fila
            id: event.data?.id,           // si tienes un identificador único
            oldValue: event.oldValue,     // valor anterior
            rowData: { ...event.data }    // copia de la fila completa
        };

        if (index > -1) {
            // Si ya existe, lo reemplazamos
            this.editadosCantidad[index] = nuevoCambio;
        } else {
            // Si no existe, lo agregamos
            this.editadosCantidad.push(nuevoCambio);
        }
    }

    private obtenerDatosFormulario() {
    }

    public guardar() {
        this.obtenerDatosFormulario();
        this.ventaKardexService.insertarMasivo(this.rowData).pipe(
        ).subscribe(respuestaApi => {
        });
    }
}





































































