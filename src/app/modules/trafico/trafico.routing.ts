import { Routes } from "@angular/router";
import { ConciliacionCasetaAbcComponent } from "./conciliacion-caseta-abc/conciliacion-caseta-abc.component";
import { ConciliacionCasetaArchivoEventoGeocercaComponent } from "./conciliacion-caseta-archivo-evento-geocerca/conciliacion-caseta-archivo-evento-geocerca.component";
import { ConciliacionCasetaArchivoEventoComponent } from "./conciliacion-caseta-archivo-evento/conciliacion-caseta-archivo-evento.component";
import { ConciliacionCasetaArchivoModalComponent } from "./conciliacion-caseta-archivo-modal/conciliacion-caseta-archivo-modal.component";
import { ConciliacionCasetaArchivoComponent } from "./conciliacion-caseta-archivo/conciliacion-caseta-archivo.component";
import { ConciliacionCasetaComponent } from "./conciliacion-caseta/conciliacion-caseta.component";
import { InicioComponent } from "./inicio/inicio.component";

export const TraficoRoute: Routes = [
  {
    path: "Inicio",
    component: InicioComponent
  },
  {
    path: "ConciliacionCaseta",
    component: ConciliacionCasetaComponent
  },
  {
    path: "ConciliacionCaseta/:id",
    component: ConciliacionCasetaComponent
  },
  {
    path: "ConciliacionCasetaAbc",
    component: ConciliacionCasetaAbcComponent
  },
  {
    path: 'ConciliacionCasetaAbc/:id',
    component: ConciliacionCasetaAbcComponent
  },
  {
    path: "ConciliacionCasetaArchivo",
    component: ConciliacionCasetaArchivoComponent
  },
  {
    path: "ConciliacionCasetaArchivo/:id",
    component: ConciliacionCasetaArchivoComponent
  },
  {
    path: "ConciliacionCasetaArchivoEvento",
    component: ConciliacionCasetaArchivoEventoComponent
  },
  {
    path: "ConciliacionCasetaArchivoEventoGeocerca",
    component: ConciliacionCasetaArchivoEventoGeocercaComponent
  },
  {
    path: "ConciliacionCasetaArchivoModal",
    component: ConciliacionCasetaArchivoModalComponent
  },
];
