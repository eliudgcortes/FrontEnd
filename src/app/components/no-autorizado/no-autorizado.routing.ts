import { Routes } from "@angular/router";
import { NoAutorizadoComponent } from "./no-autorizado.component";

export const NoAutorizadoRoute: Routes = [
  {
    path: "",
    component: NoAutorizadoComponent,
    data: { title: "No autorizado", breadcrusm: "No autorizado" }
  }
];