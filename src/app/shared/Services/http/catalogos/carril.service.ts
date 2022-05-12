import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carril } from 'app/shared/Models/catalogos/carril.model';
import { CarrilSearchModel } from 'app/shared/SearchModels/catalogos/carrril_search.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrilService {

  constructor(public http: HttpClient) { }

  obtenerPorId(id:string) {
    return this.http.get(environment.apiURL + 'carril/'+ id);
  }

  obtenerLista(f:CarrilSearchModel) {
    return this.http.get(environment.apiURL + 'carril/?nombre=' + (f.nombre != '' ? f.nombre : '%00')
    + '&descripcion=' + (f.descripcion != '' ? f.descripcion : '%00')
    + '&aliasIave=' + (f.aliasIave != '' ? f.aliasIave : '%00')
    + '&casetaId=' + f.casetaId
    );
  }

  actualizar(modelo:Carril) {
    return this.http.put(environment.apiURL + 'carril/', modelo);
  }

  insertar(modelo:Carril) {
    return this.http.post(environment.apiURL + 'carril/', modelo);
  }

  carrilDuplicadoPorId(id:number) {
    return this.http.post(environment.apiURL + 'carril/clonarCarril/', id);
  }

  eliminar(id:string) {
    return this.http.delete(environment.apiURL + 'carril/' + id);
  }
}
