export class DTOTurno {
  name!: string;
  code!: string;

  constructor(init?: Partial<DTOTurno>) {
    Object.assign(this, init);
  }
}

export class DTOTabla {
  codigoTabla!: string;
  tipoRegistro!: string;
  descripcionTabla!: string;
  codigo!: string;
  descripcionCampo!: string;
  descripcionCorta!: string;
  orden?: number;
  estado!: string;
  codigoUsuario!: string;
  fechaModificacion?: string;
  sistemaOperativo!: string;

  constructor(init?: Partial<DTOTabla>) {
    Object.assign(this, init);
  }
}

export class DTOSistemaProducto {
  codigoProducto!: string;
  tipoInventario!: string;
  nombreProducto!: string;
  nombreCorto!: string;
  fabricante!: string;
  turno!: string;
  area!: string;
  seccion!: string;
  grupo!: string;
  orden?: number | null;
  estado!: string;
  costoProducto?: number | null;
  precioVenta?: number | null;
  precioMayorista?: number | null;
  duracion?: number | null;
  fechaCreacion?: string | null;
  codigoUsuario?: string;
  fechaModificacion?: string | null;
  sistemaOperativo?: string;
  //Propiedades Adicionales
  local?: DTOSistemaLocal | null;
  tablaInventario?: DTOTabla | null;
  tablaTurno?: DTOTabla | null;
  tablaArea?: DTOTabla | null;
  tablaSeccion?: DTOTabla | null;
  tablaGrupo?: DTOTabla | null;
  tablaEstado?: DTOTabla | null;

  constructor(init?: Partial<DTOSistemaProducto>) {
    Object.assign(this, init);
  }
}

export class DTOSistemaLocal {
  codigoLocal!: string;
  tipoLocal!: string;
  estado!: string;
  orden?: number | null;
  nombreLocal!: string;
  nombreCorto!: string;
  numeroRuc!: string;
  direccionLocal!: string;
  fechaCreacion?: string | null;
  codigoUsuario?: string;
  fechaModificacion?: string | null;
  sistemaOperativo?: string;

  constructor(init?: Partial<DTOSistemaLocal>) {
    Object.assign(this, init);
  }
}