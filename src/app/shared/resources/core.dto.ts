export interface TurnoDTO {
    name: string;
    code: string;
}

export interface TablaDTO {
    codigoTabla: string;
    tipoRegistro: string;
    descripcionTabla: string;
    codigo: string;
    descripcionCampo: string;
    descripcionCorta: string;
    orden?: number;
    estado: string;
    codigoUsuario: string;
    fechaModificacion?: string;
    sistemaOperativo: string;
}

export interface SistemaProductoDTO {
  codigoProducto: string;
  tipoInventario: string;
  nombreProducto: string;
  nombreCorto: string;
  fabricante: string;
  turno: string;
  area: string;
  seccion: string;
  grupo: string;
  orden?: number | null;
  estado: string;
  costoProducto?: number | null;
  precioVenta?: number | null;
  precioMayorista?: number | null;
  duracion?: number | null;
  fechaCreacion?: string | null;
  codigoUsuario?: string;        // <- ahora opcional
  fechaModificacion?: string | null;
  sistemaOperativo?: string;     // <- ahora opcional
}