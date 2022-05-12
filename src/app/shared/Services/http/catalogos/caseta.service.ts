import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caseta } from 'app/shared/Models/catalogos/caseta.model';
import { CampoTicketCasetaSearchModel } from 'app/shared/SearchModels/catalogos/campoticketcaseta_search.model';
import { CasetaSearchModel } from 'app/shared/SearchModels/catalogos/caseta_search.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasetaService {

  constructor(public http: HttpClient) { }

  obtenerPorId(id: string) {
    return this.http.get(environment.apiURL + 'Caseta/' + id);
  }

  obtenerLista(f: CasetaSearchModel) {
    return this.http.get(environment.apiURL 
      + 'Caseta/?Nombre=' + (f.nombre != '' ? f.nombre : '%00')
      + '&Id=' + f.id
      + '&AliasIave=' + (f.aliasIave != '' ? f.aliasIave : '%00')
      + '&Descripcion=' + (f.descripcion != '' ? f.descripcion : '%00')
      + '&metodoPagoId=' + f.metodoPagoId
    );
  }

  actualizar(modelo: Caseta) {
    return this.http.put(environment.apiURL + 'Caseta/', modelo);
  }

  insertar(modelo: Caseta) {
    return this.http.post(environment.apiURL + 'Caseta/', modelo);
  }

  eliminar(id: number) {
    return this.http.delete(environment.apiURL + 'Caseta/' + id);
  }
}
