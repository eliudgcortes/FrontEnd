import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConciliacionCaseta } from 'app/shared/Models/trafico/conciliacion-caseta.model';
import { ConciliacionCasetaSearchModel } from 'app/shared/SearchModels/trafico/conciliacion-caseta_search.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConciliacionCasetaService {

  constructor(private http: HttpClient) { }

  // obtenerPrueba() {
  //   var x =  this.http.get(environment.apiURL 
  //     + 'ConciliacionCaseta/prueba')
  //   console.log (x);
  //   return x;
  // }

  obtenerPorId(id: string) {
    return this.http.get(environment.apiURL + 'ConciliacionCaseta/' + id);
  }

  obtenerLista(f: ConciliacionCasetaSearchModel) {
    console.log(f);
    
    return this.http.get(environment.apiURL 
      + 'ConciliacionCaseta/?'
      + '&ClaveRed=' + f.claveRed
      + '&fechaInicio=' + (f.fechaInicio == '' ? f.fechaInicio : '0001-01-01') 
      + '&fechaFin=' + (f.fechaFin == '' ? f.fechaFin : '0001-01-01') 
      + '&empresaId=' + f.empresaId
    );
  }

  actualizar(modelo: ConciliacionCaseta) {
    return this.http.put(environment.apiURL + 'ConciliacionCaseta/', modelo);
  }

  insertar(modelo: ConciliacionCaseta) {
    return this.http.post(environment.apiURL + 'ConciliacionCaseta/', modelo);
  }

  eliminar(id: number) {
    return this.http.delete(environment.apiURL + 'ConciliacionCaseta/' + id);
  }
}
