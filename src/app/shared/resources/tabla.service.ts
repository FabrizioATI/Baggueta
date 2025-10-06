import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppConfiguration, Module } from 'src/app/shared/resources/app.configuration';
import { ErrorInfo } from 'src/app/shared/resources/app.errorInfo';

@Injectable({
    providedIn: 'root'
})
export class SistemaTablaService {
    private urlApi!: string;
    constructor(
        private httpClient: HttpClient,
        private appConfig: AppConfiguration
    ) {
        this.urlApi = this.appConfig.getUrlApiByModule(Module.Administrador) + "sistematabla/";
    }

  public insertar(objeto: any): Observable<any> {
    return this.httpClient.post<any>(this.urlApi + 'insertar', objeto)
      .pipe(
        map(respuestaAPI => { return respuestaAPI }),
        catchError(new ErrorInfo().parseObservableResponseError)
      );
  }

  public obtener(): Observable<any> {
    return this.httpClient.post<any>(this.urlApi + 'obtener', {})
      .pipe(
        map(respuestaAPI => { return respuestaAPI }),
        catchError(new ErrorInfo().parseObservableResponseError)
      );
  }

  public actualizar(objeto: any): Observable<any> {
    return this.httpClient.post<any>(this.urlApi + 'actualizar', objeto)
      .pipe(
        map(respuestaAPI => { return respuestaAPI }),
        catchError(new ErrorInfo().parseObservableResponseError)
      );
  }

  public eliminar(id: number): Observable<any> {
    const objetoJSON = { id: id };
    return this.httpClient.post<any>(this.urlApi + 'eliminar', objetoJSON)
      .pipe(
        map(respuestaAPI => { return respuestaAPI }),
        catchError(new ErrorInfo().parseObservableResponseError)
      );
  }
}
