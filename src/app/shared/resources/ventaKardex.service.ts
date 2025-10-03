import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppConfiguration, Module } from 'src/app/shared/resources/app.configuration';
import { ErrorInfo } from 'src/app/shared/resources/app.errorInfo';

@Injectable({
    providedIn: 'root'
})
export class VentaKardexService {
    private urlApi!: string;
    constructor(
        private httpClient: HttpClient,
        private appConfig: AppConfiguration
    ) {
        this.urlApi = this.appConfig.getUrlApiByModule(Module.Administrador) + "ventakardex/";
    }

    public insertarMasivo(listaKardex: any): Observable<any> {
        var objetoJSON = {
            listaKardex: listaKardex,
        };

        return this.httpClient.post<any>(this.urlApi + "insertarMasivo", objetoJSON)
            .pipe(
                map(respuestaAPI => { return respuestaAPI }),
                catchError(new ErrorInfo().parseObservableResponseError)
            );
    }

}
