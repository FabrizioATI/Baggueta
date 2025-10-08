import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppConfiguration, Module } from 'src/app/shared/resources/app.configuration';
import { ErrorInfo } from 'src/app/shared/resources/app.errorInfo';
import { DTOSistemaProducto, DTOTabla, DTOTurno } from 'src/app/shared/resources/core.dto';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private urlApi!: string;
    constructor(
        private httpClient: HttpClient,
        private appConfig: AppConfiguration
    ) {
        this.urlApi = this.appConfig.getUrlApiByModule(Module.Administrador) + "sistemaproducto/";
    }

  public insertar(sistemaProducto: DTOSistemaProducto): Observable<any> {
    const objetoJSON = { DTOSistemaProducto: sistemaProducto };
    return this.httpClient.post<any>(this.urlApi + 'insertar', {objetoJSON})
      .pipe(
        map(respuestaAPI => { return respuestaAPI }),
        catchError(new ErrorInfo().parseObservableResponseError)
      );
  }

  public modificar(listaSistemaProducto: any): Observable<any> {
    const objetoJSON = { DTOSistemaProducto: listaSistemaProducto };
    return this.httpClient.post<any>(this.urlApi + 'modificar', objetoJSON)
      .pipe(
        map(respuestaAPI => { return respuestaAPI }),
        catchError(new ErrorInfo().parseObservableResponseError)
      );
  }

  public obtener(DTOSistemaProducto: DTOSistemaProducto): Observable<any> {
    const objetoJSON = { DTOSistemaProducto: DTOSistemaProducto };
    return this.httpClient.post<any>(this.urlApi + 'obtener', {objetoJSON})
      .pipe(
        map(respuestaAPI => { return respuestaAPI }),
        catchError(new ErrorInfo().parseObservableResponseError)
      );
  }

  public eliminar(listaSistemaProducto: any): Observable<any> {
    const objetoJSON = { DTOSistemaProducto: listaSistemaProducto };
    return this.httpClient.post<any>(this.urlApi + 'eliminar', objetoJSON)
      .pipe(
        map(respuestaAPI => { return respuestaAPI }),
        catchError(new ErrorInfo().parseObservableResponseError)
      );
  }

  public obtenerDependencias(): Observable<any> {
    const objetoJSON = {};
    return this.httpClient.post<any>(this.urlApi + 'obtenerDependencias', objetoJSON)
      .pipe(
        map(respuestaAPI => { return respuestaAPI }),
        catchError(new ErrorInfo().parseObservableResponseError)
      );
  }
  
}
