import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaGenericaTipo } from 'app/shared/Models/catalogos/listagenericatipo.model';
import { ListaGenericaTipoSearchModel} from 'app/shared/SearchModels/catalogos/listagenericatipo_search.model';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListaGenericaTipoService {
    
  
  constructor(public http: HttpClient) { }

    obtenerPorId(id:string) {
        return this.http.get(environment.apiURL + 'ListaGenericaTipo/'+ id);
    }

    obtenerLista(f:ListaGenericaTipoSearchModel) {
        return this.http.get(environment.apiURL + 'ListaGenericaTipo/?nombre=' + (f.nombre != '' ? f.nombre : '%00')
        + '&descripcion=' + (f.descripcion != '' ? f.descripcion : '%00')
        + '&fechaInicio=' + (f.fechaInicio != '' ? f.fechaInicio : '0001-01-01')
        + '&fechaFin=' + (f.fechaFin != '' ? f.fechaFin : '0001-01-01')
        );
        
    }
 
    actualizar(modelo:ListaGenericaTipo) {
        return this.http.put(environment.apiURL + 'ListaGenericaTipo/', modelo);
    }

    insertar(modelo:ListaGenericaTipo) {
        return this.http.post(environment.apiURL + 'ListaGenericaTipo/', modelo);
    }

    eliminar(id:string) {
        return this.http.delete(environment.apiURL + 'ListaGenericaTipo/' + id);
    }


}

