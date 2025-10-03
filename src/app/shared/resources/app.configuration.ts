import { Injectable } from '@angular/core';
import { STRING_EMPTY } from './app.constant';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppConfiguration {

    constructor() { }

    public getUrlApiByModule(option: Module) {
        let result: string = STRING_EMPTY;

        switch (option) {
            case Module.Administrador:
                result = environment.apiUrlAdministrador + "Administrador/";
                break;
        }

        return result;
    }
    public getBaseUrl() {
        return environment.baseHref;
    }
}

export enum Module {
    Administrador,
}
 