import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geocerca } from 'app/shared/Models/catalogos/geocerca.model';
import { GeocercaSearchModel } from 'app/shared/SearchModels/catalogos/geocerca_search.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeocercaService {

  constructor(public http: HttpClient) { }

  obtenerPorId(id:string) {
    return this.http.get(environment.apiURL + 'Geocerca/'+ id);
  }

  obtenerLista(f:GeocercaSearchModel) {
      return this.http.get(environment.apiURL
      + 'Geocerca/?Geocerca='
      + (f.nombre != '' ? f.nombre : '%00')
      + '&GeocercaId=' + f.id
      + (f.nombre != '' ? f.nombre : '%00')
      );
  }

  obtenerListaTabla(f:GeocercaSearchModel) {
    return this.http.get(environment.apiURL + 'Geocerca/Tabla/?nombre=' + (f.nombre != '' ? f.nombre : '%00') + '&NumeroElementos=' + f.numeroElementos
    );
  }

  obtenerGeocercasSinDireccion() {
    return this.http.get(environment.apiURL + 'Geocerca/sinAzureDireccion'
    );
  }

  actualizar(modelo:Geocerca) {
    return this.http.put(environment.apiURL + 'Geocerca/', modelo);
  }

  insertar(modelo:Geocerca) {
    return this.http.post(environment.apiURL + 'Geocerca/', modelo);
  }

  eliminar(id:number) {
    return this.http.delete(environment.apiURL + 'Geocerca/' + id);
  }

  actualizarDescripciones(modelo:Geocerca[]) {
    return this.http.put(environment.apiURL + 'Geocerca/direccion-geocercas', modelo);
  }
}
