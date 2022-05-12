import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConciliacionCasetaArchivo } from 'app/shared/Models/trafico/conciliacion-caseta-archivo-evento.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConciliacionCasetaArchivoService {

  constructor(public http: HttpClient) { }

  // obtenerPorId(id: string) {
  //   return this.http.get(environment.apiURL + 'ConciliacionCasetaArchivo/' + id);
  // }

  // obtenerLista(f: CasetaSearchModel) {
  //   return this.http.get(environment.apiURL 
  //     + 'Caseta/?Nombre=' + (f.nombre != '' ? f.nombre : '%00')
  //     + '&Id=' + f.id
  //     + '&AliasIave=' + (f.aliasIave != '' ? f.aliasIave : '%00')
  //     + '&Descripcion=' + (f.descripcion != '' ? f.descripcion : '%00')
  //     + '&metodoPagoId=' + f.metodoPagoId
  //   );
  // }

  actualizar(modelo: ConciliacionCasetaArchivo) {
    return this.http.put(environment.apiURL + 'ConciliacionCasetaArchivo/', modelo);
  }

  insertar(modelo: ConciliacionCasetaArchivo) {
    return this.http.post(environment.apiURL + 'ConciliacionCasetaArchivo/', modelo);
  }

  // eliminar(id: number) {
  //   return this.http.delete(environment.apiURL + 'Caseta/' + id);
  // }
}
