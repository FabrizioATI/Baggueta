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
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductoService } from "../../../shared/resources/producto.service";
import { SistemaProductoDTO, TablaDTO, TurnoDTO } from 'src/app/shared/resources/core.dto';


@Component({
    selector: 'productos',
    standalone: true,
    imports: [
        InputTextModule,
        InputNumberModule,
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
    templateUrl: 'productos.html',
    styleUrl: 'productos.scss',
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class Productos implements OnInit, OnDestroy {

    //Control de vistas
    constructor(
        private methodsCommon: MethodsCommon,
        private productosService: ProductoService
    ) { }

    //AG-GRID
    public gridOptions!: GridOptions;
    public gridApi!: GridApi;
    public rowData: any[] = [];

    //Inputs Filtros
    public listaArea: TablaDTO[] = [];
    public listaInventario: TablaDTO[] = [];
    public listaTurno: TablaDTO[] = [];
    public listaSeccion: TablaDTO[] = [];
    public listaGrupo: TablaDTO[] = [];
    public listaEstado: TablaDTO[] = [];

    //Variables de Formulario
    public mostrarRegistro = false;
    public sistemaProducto: SistemaProductoDTO = new SistemaProductoDTO();

    //Control Formulario
    private destroy$ = new Subject<void>();
    public formProductoComponent: FormGroup = new FormGroup({});

    //Control Init y Destroy
    ngOnInit() {
        this.configurarComponente();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    //Control de vistas
    public crearFormulario() {
        this.formProductoComponent = new FormGroup({
            tipoInventario: new FormControl(),
            nombreProducto: new FormControl(),
            turno: new FormControl(),
            area: new FormControl(),
            seccion: new FormControl(),
            grupo: new FormControl(),
            precioVenta: new FormControl(),
            precioMayoreo: new FormControl(),
            duracionProducto: new FormControl(),
            estado: new FormControl()
        });
    }

    public configurarComponente() {
        this.crearFormulario();
        this.obtenerDatosServidor().pipe(
            takeUntil(this.destroy$)
        ).subscribe(respuestaServidor => {
            this.asignarValoresFormulario(respuestaServidor);
        });
    }

    public obtenerDatosServidor(): Observable<any> {
        const arrayToForkJoin: any = {
            obtenerDependenciasResult: this.productosService.obtenerDependencias().pipe(),
        };
        return forkJoin(arrayToForkJoin);
    }

    public asignarValoresFormulario(respuestaServidor: any) {
        
        this.listaArea = respuestaServidor.obtenerDependenciasResult.resultado.tipoArea;
        this.listaInventario = respuestaServidor.obtenerDependenciasResult.resultado.tipoInventario;
        this.listaTurno = respuestaServidor.obtenerDependenciasResult.resultado.tipoTurno;

        this.listaSeccion = respuestaServidor.obtenerDependenciasResult.resultado.tipoSeccion;
        this.listaGrupo = respuestaServidor.obtenerDependenciasResult.resultado.tipoGrupo;
        this.listaEstado = respuestaServidor.obtenerDependenciasResult.resultado.tipoEstado;

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
            { field: "grupo", headerName: "Grupo", editable: false, hide: true },
            { field: "preventa", headerName: "Preventa", editable: false, valueParser: this.numberParser, hide: true },

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
    }

    public numberParser(params: any) {
        return Number(params.newValue);
    }

    //Metodos Productos
    public registrar() {
        this.mostrarRegistro = true;
    }

    public onCellValueChanged(event: any) {
        // const index = this.editadosCantidad.findIndex(
        //     item => item.rowIndex === event.rowIndex
        // );

        // const nuevoCambio = {
        //     rowIndex: event.rowIndex,     // número de fila
        //     id: event.data?.id,           // si tienes un identificador único
        //     oldValue: event.oldValue,     // valor anterior
        //     rowData: { ...event.data }    // copia de la fila completa
        // };

        // if (index > -1) {
        //     // Si ya existe, lo reemplazamos
        //     this.editadosCantidad[index] = nuevoCambio;
        // } else {
        //     // Si no existe, lo agregamos
        //     this.editadosCantidad.push(nuevoCambio);
        // }
    }

    private obtenerDatosFormulario() {
        const tipoInventario = this.formProductoComponent.get('tipoInventario')?.value as TablaDTO;
        const nombreProducto = this.formProductoComponent.get('nombreProducto')?.value as TablaDTO;
        const turno = this.formProductoComponent.get('turno')?.value as TablaDTO;
        const area = this.formProductoComponent.get('area')?.value as TablaDTO;
        const seccion = this.formProductoComponent.get('seccion')?.value as TablaDTO;
        const grupo = this.formProductoComponent.get('grupo')?.value as TablaDTO;
        const precioVenta = this.formProductoComponent.get('precioVenta')?.value ?? 0;
        const precioMayoreo = this.formProductoComponent.get('precioMayoreo')?.value ?? 0;
        const duracionProducto = this.formProductoComponent.get('duracionProducto')?.value ?? 0;
        const estado = this.formProductoComponent.get('estado')?.value as TablaDTO;

        this.sistemaProducto = {
            codigoProducto: '',
            tipoInventario: tipoInventario ? tipoInventario.codigo : '',
            nombreProducto: nombreProducto ? nombreProducto.descripcionCampo : '',
            nombreCorto: nombreProducto ? nombreProducto.descripcionCorta : '',
            fabricante: '',
            turno: turno ? turno.codigo : '',
            area: area ? area.codigo : '',
            seccion: seccion ? seccion.codigo : '',
            grupo: grupo ? grupo.codigo : '',
            orden: null,
            estado: estado ? estado.codigo : '',
            costoProducto: null,    
            precioVenta: precioVenta,
            precioMayorista: precioMayoreo,
            duracion: duracionProducto,
        };
    }

    public guardar() {
        this.obtenerDatosFormulario();
        this.productosService.insertar(this.rowData).pipe(
        ).subscribe(respuestaApi => {
        });
    }

    public buscar() {
        this.obtenerDatosFormulario();
        this.productosService.obtener(this.sistemaProducto).pipe(
        ).subscribe(respuestaApi => {
            if (!respuestaApi.mensaje.idLog || respuestaApi.mensaje.idLog === "") {
                console.log(respuestaApi.listaProductoProductos, respuestaApi.mensaje);
                this.rowData = respuestaApi.listaProductoProductos;
                this.gridApi.setGridOption("rowData", this.rowData);
            }
        });
    }
}

































































