import { Caja } from './components/Caja/caja';
import { Routes } from '@angular/router';
import { Cierre } from './components/Cierre/cierre';
import { Clientes } from './components/Clientes/clientes';
import { Distribucion } from './components/Distribucion/distribucion';
import { Ingresos } from './components/Ingresos/ingresos';
import { Operaciones } from './components/Operaciones/operaciones';
import { Productos } from './components/Productos/productos';
import { Reportes } from './components/Reportes/reportes';
import { Retiros } from './components/Retiros/retiros';
import { Usuarios } from './components/Usuarios/usuarios';

export default [
    { path: 'caja', data: { breadcrumb: 'Caja' }, component: Caja },
    { path: 'cierre', data: { breadcrumb: 'Cierre' }, component: Cierre },
    { path: 'clientes', data: { breadcrumb: 'Clientes' }, component: Clientes },
    { path: 'distribucion', data: { breadcrumb: 'Distribucion' }, component: Distribucion },
    { path: 'ingresos', data: { breadcrumb: 'Ingresos' }, component: Ingresos },
    { path: 'operaciones', data: { breadcrumb: 'Operaciones' }, component: Operaciones },
    { path: 'productos', data: { breadcrumb: 'Productos' }, component: Productos },
    { path: 'reportes', data: { breadcrumb: 'Reportes' }, component: Reportes },
    { path: 'retiros', data: { breadcrumb: 'Retiros' }, component: Retiros },
    { path: 'usuarios', data: { breadcrumb: 'Usuarios' }, component: Usuarios },
    { path: '**', redirectTo: '/notfound' }
] as Routes;