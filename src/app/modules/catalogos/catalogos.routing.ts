import { Routes } from "@angular/router";
import { ListaGenericaTipoAbcComponent } from "./lista-generica-tipo-abc/lista-generica-tipo-abc.component";
import { ListaGenericaTipoComponent } from "./lista-generica-tipo/lista-generica-tipo.component";
import { ListagenericaComponent } from "./listagenerica/listagenerica.component";
import { ListagenericaAbcComponent } from "./listagenerica-abc/listagenerica-abc.component";
import { ListaGenericaTipoAbcModalComponent } from "./lista-generica-tipo-abc-modal/lista-generica-tipo-abc-modal.component";
import { CasetaAbcComponent } from "./caseta-abc/caseta-abc.component";
import { CasetasComponent } from "./casetas/casetas.component";
import { CarrilModalComponent } from "./carril-modal/carril-modal.component";
import { GeocercaAbcComponent } from "./geocerca-abc/geocerca-abc.component";
import { GeocercasComponent } from "./geocercas/geocercas.component";

export const CatalogosRoute: Routes = [
  {
    path: "ListasGenericasTipo",
    component: ListaGenericaTipoComponent
  },
  {
    path: "Listagenerica",
    component: ListagenericaComponent
  },
  {
    path: 'ListaGenericas-abc/:listaGenericaTipoId',
    component: ListagenericaAbcComponent
  },
  {
    path: 'ListaGenericas-abc/:listaGenericaTipoId/:id',
    component: ListagenericaAbcComponent
  },
  {
    path: 'ListaGenericasTipo-abc',
    component: ListaGenericaTipoAbcComponent
  },
  {
    path: 'ListaGenericasTipo-abc/:id',
    component: ListaGenericaTipoAbcComponent
  },
  {
    path: 'ListasGenericasTipo/:id',
    component: ListaGenericaTipoAbcModalComponent
  },
  {
    path: 'Casetas-abc',
    component: CasetaAbcComponent
  },
  {
    path: 'Casetas-abc/:id',
    component: CasetaAbcComponent
  },
  {
    path: "Casetas",
    component: CasetasComponent
  },
  {
    path: "Casetas/:id",
    component: CasetasComponent
  },
  {
    path: "Carril-modal",
    component: CarrilModalComponent
  },
  {
    path: "Carril-modal/:id",
    component: CarrilModalComponent
  },
  {
    path: "Geocercas",
    component: GeocercasComponent
  },
  {
    path: "Geocerca-abc/:id",
    component: GeocercaAbcComponent
  },
  {
    path: "Geocerca-abc",
    component: GeocercaAbcComponent
  }
];
