// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/*
export const environment: any = {
  production: false,
  hmr: false,
  apiUrlAdministrador: "https://qasigsintegral.consejeros.com.pe/WTQ_CN_API_Administrador/api/",
  apiUrlSisAdmin: "https://qasigsintegral.consejeros.com.pe/WTQ_CN_API_SisAdmin/api/",
  apiUrlCapacitacion: "https://qasigsintegral.consejeros.com.pe/WTQ_CN_API_Capacitacion/api/",
  apiUrlCotizacionVenta: "https://qasigsintegral.consejeros.com.pe/WTQ_CN_API_CotizacionVenta/api/",
  apiUrlComunicacion: "http://localhost:6130/api/",
  apiUrlErrorLog: "http://localhost:6150/api/",
  apiUrlGestionCotizacionVenta: "http://localhost:6160/api/",
  apiUrlVehiculo: "http://localhost:6180/api/",
  baseHref: "",
  titleHTMLDocument: "SIGS_Retail",
  titleDataContact: "Consejeros y Corredores de Seguros S.A. ©",
  urlDataContact: "https://www.consejeros.com.pe/ccs/",
  limiteTiempoInactividad: 3600, //Tiempo expresado en segundos.
};
*/

export const environment: any = {
  production: false,
  hmr: false,
  apiUrlAdministrador: "http://localhost:5110/api/",
  baseHref: "",
  titleHTMLDocument: "",
  titleDataContact: "",
  urlDataContact: "",
  limiteTiempoInactividad: 3600, //Tiempo expresado en segundos.
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
 