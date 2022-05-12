import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListaGenerica } from 'app/shared/Models/catalogos/listagenerica.model';
import { ListaGenericaSearchModel} from 'app/shared/SearchModels/catalogos/listagenerica_search.model';
import { environment } from 'environments/environment';
import { ListaGenericaTipoSearchModel} from 'app/shared/SearchModels/catalogos/listagenericatipo_search.model';
import { ListaGenericaTipo } from 'app/shared/Models/catalogos/listagenericatipo.model';


@Injectable({
  providedIn: 'root'
})
export class ListaGenericaService {

  constructor(public http: HttpClient) { }

    obtenerPorId(id:string) {
        return this.http.get(environment.apiURL + 'Listagenerica/'+ id);
    }

    obtenerlista(f:ListaGenericaSearchModel) {
        return this.http.get(environment.apiURL + 'Listagenerica/?' 
         + 'listaGenericaTipoId=' + f.listaGenericaTipoId
         + '&estatus=' + f.estatus
         + '&bActivo=true'
        ) 
    }

    actualizar(modelo:ListaGenerica) {
        return this.http.put(environment.apiURL + 'Listagenerica/', modelo);
    }

    insertar(modelo:ListaGenerica) {
        return this.http.post(environment.apiURL + 'Listagenerica/', modelo);
    }

    eliminar(id:string) {
        return this.http.delete(environment.apiURL + 'Listagenerica/' + id);
    }
}
