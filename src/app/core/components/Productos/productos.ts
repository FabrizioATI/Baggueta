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
import { DTOSistemaProducto, DTOTabla, DTOTurno } from 'src/app/shared/resources/core.dto';


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
    public listaArea: DTOTabla[] = [];
    public listaInventario: DTOTabla[] = [];
    public listaTurno: DTOTabla[] = [];
    public listaSeccion: DTOTabla[] = [];
    public listaGrupo: DTOTabla[] = [];
    public listaEstado: DTOTabla[] = [];

    //Variables de Formulario
    public editadosCantidad: any[] = [];
    public mostrarRegistro = false;
    public sistemaProducto: DTOSistemaProducto = new DTOSistemaProducto();
    public listaSistemaProducto: DTOSistemaProducto[] = [];

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
            estado: new FormControl(),
            costoProducto: new FormControl(),
        });
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
            {
                headerCheckboxSelection: true,  // Muestra el checkbox en la cabecera para seleccionar todo
                checkboxSelection: true,        // Muestra el checkbox en cada fila para selección individual
                width: 50,                      // Ajusta el tamaño de la columna
                editable: false
            },
            { field: "codigoProducto", headerName: "Código Producto", editable: false, hide: true },
            { field: "area", headerName: "Área", editable: false, hide: true },
            { field: "seccion", headerName: "Sección", editable: false, hide: true },
            { field: "tipoInventario", headerName: "Tipo Inventario", editable: false, hide: true },
            { field: "sistemaOperativo", headerName: "Sistema Operativo", editable: false, hide: true },
            { field: "codigoUsuario", headerName: "Código Usuario", editable: false, hide: true },
            { field: "fechaModificacion", headerName: "Fecha Modificación", editable: false, hide: true },
            { field: "fabricante", headerName: "Codigo Fabricante", editable: false },
            { field: "local.nombreLocal", headerName: "Fabricante", editable: false },
            { field: "nombreProducto", headerName: "Producto", editable: false },
            { field: "nombreCorto", headerName: "Nombre Corto", editable: false },
            { field: "tablaTurno.descripcionCampo", headerName: "Turno", editable: false },
            { field: "tablaGrupo.descripcionCampo", headerName: "Grupo", editable: false },
            { field: "orden", headerName: "Orden", editable: true, valueParser: this.numberParser },
            {
                field: "tablaEstado.descripcionCampo",
                headerName: "Estado",
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: (params: any) => {
                    return {
                        values: this.listaEstado.map(e => e.descripcionCampo)
                    };
                },
                valueSetter: (params: any) => {
                    const estadoSeleccionado = this.listaEstado.find(
                        e => e.descripcionCampo === params.newValue
                    );
                    if (estadoSeleccionado) {
                        console.log(estadoSeleccionado.codigo)
                        params.data.tablaEstado = estadoSeleccionado;
                        params.data.estado = estadoSeleccionado.codigo;
                        return true;
                    }
                    return false;
                }
            },
            { field: "costoProducto", headerName: "Costo", editable: true, valueParser: this.numberParser },
            { field: "precioVenta", headerName: "Precio Venta", editable: true, valueParser: this.numberParser },
            { field: "precioMayorista", headerName: "Precio Mayorista", editable: true, valueParser: this.numberParser },
            { field: "duracion", headerName: "Duración", editable: true, valueParser: this.numberParser },
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
        this.gridApi.selectAll();
        this.rowData = [];
    }

    public numberParser(params: any) {
        return Number(params.newValue);
    }

    public onCellValueChanged(event: any) {
        const index = this.editadosCantidad.findIndex(
            item => item.rowIndex === event.rowIndex
        );

        const nuevoCambio = {
            rowIndex: event.rowIndex,
            id: event.data?.id,
            oldValue: event.oldValue,
            rowData: { ...event.data }
        };

        if (index > -1) {
            this.editadosCantidad[index] = nuevoCambio;
        } else {
            this.editadosCantidad.push(nuevoCambio.rowData);
        }
    }

    //Metodos Productos
    public registrar() {
        this.mostrarRegistro = true;
    }

    private obtenerDatosFormulario() {
        const tipoInventario = this.formProductoComponent.get('tipoInventario')?.value as DTOTabla;
        const nombreProducto = this.formProductoComponent.get('nombreProducto')?.value;
        const turno = this.formProductoComponent.get('turno')?.value as DTOTabla;
        const area = this.formProductoComponent.get('area')?.value as DTOTabla;
        const seccion = this.formProductoComponent.get('seccion')?.value as DTOTabla;
        const grupo = this.formProductoComponent.get('grupo')?.value as DTOTabla;
        const precioVenta = this.formProductoComponent.get('precioVenta')?.value ?? 0;
        const precioMayoreo = this.formProductoComponent.get('precioMayoreo')?.value ?? 0;
        const duracionProducto = this.formProductoComponent.get('duracionProducto')?.value ?? 0;
        const estado = this.formProductoComponent.get('estado')?.value as DTOTabla;
        const costoProducto = this.formProductoComponent.get('costoProducto')?.value ?? 0;

        this.sistemaProducto = {
            codigoProducto: '',
            tipoInventario: tipoInventario ? tipoInventario.codigo : '',
            nombreProducto: nombreProducto ? nombreProducto : '',
            nombreCorto: nombreProducto ? nombreProducto : '',
            fabricante: '',
            turno: turno ? turno.codigo : '',
            area: area ? area.codigo : '',
            seccion: seccion ? seccion.codigo : '',
            grupo: grupo ? grupo.codigo : '',
            orden: null,
            estado: estado ? estado.codigo : '',
            costoProducto: costoProducto,
            precioVenta: precioVenta,
            precioMayorista: precioMayoreo,
            duracion: duracionProducto,
        };
    }

    public guardar() {
        this.obtenerDatosFormulario();
        console.log(this.sistemaProducto)
        this.productosService.insertar(this.sistemaProducto).pipe(
        ).subscribe(respuestaApi => {
        });
    }

    public modificar() {
        this.listaSistemaProducto = this.editadosCantidad;
        this.productosService.modificar(this.listaSistemaProducto).pipe(
        ).subscribe(respuestaApi => {
        });
    }

    public buscar() {
        this.obtenerDatosFormulario();
        this.productosService.obtener(this.sistemaProducto).pipe(
        ).subscribe(respuestaApi => {
            if (!respuestaApi.mensaje.idLog || respuestaApi.mensaje.idLog === "") {
                this.rowData = respuestaApi.resultado;
                console.log(respuestaApi.resultado)
                this.gridApi.setGridOption("rowData", this.rowData);
            }
        });
    }

    public eliminar() {
        const filasSeleccionadas = this.gridApi.getSelectedRows();
        console.log(filasSeleccionadas);
        if (filasSeleccionadas.length > 0) {
            this.productosService.eliminar(filasSeleccionadas).pipe(
            ).subscribe(respuestaApi => {
                if (!respuestaApi.mensaje.idLog || respuestaApi.mensaje.idLog === "") {
                    this.rowData = respuestaApi.resultado;
                    console.log(respuestaApi.resultado)
                    this.gridApi.setGridOption("rowData", this.rowData);
                }
            });
        }
    }

    public cancelar() {
        this.mostrarRegistro = false;
        this.formProductoComponent.reset();
        this.rowData = [];
        this.gridApi.setGridOption("rowData", this.rowData);
    }
}
