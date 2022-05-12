import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Peaje } from 'app/shared/Models/catalogos/peaje.model';
import { PeajeSearchModel } from 'app/shared/SearchModels/catalogos/peaje_search.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeajeService {

    constructor(public http: HttpClient) { }

    obtenerPorId(id: string) {
      return this.http.get(environment.apiURL + 'Peaje/' + id);
    }
  /*
    obtenerLista(f: PeajeSearchModel) {
      return this.http.get(environment.apiURL + 'Peaje/?Caseta=' + (f.nombre != '' ? f.nombre : '%00')
        + '&CasetaId=' + f.id
        + (f.nombre != '' ? f.nombre : '%00')
        + (f.descripcion != '' ? f.descripcion : '%00')
        + '&metodoPagoId=' + f.metodoPagoId
      );
    }*/

    actualizar(modelo: Peaje) {
      return this.http.put(environment.apiURL + 'Peaje/', modelo);
    }

    insertar(modelo: Peaje) {
      return this.http.post(environment.apiURL + 'Peaje/', modelo);
    }

    eliminar(id: number) {
      return this.http.delete(environment.apiURL + 'Peaje/' + id);
    }
}
