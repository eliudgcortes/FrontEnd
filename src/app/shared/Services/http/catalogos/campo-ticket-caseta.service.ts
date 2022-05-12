import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampoTicketCaseta } from 'app/shared/Models/catalogos/campoticketcaseta.model';
import { CampoTicketCasetaSearchModel } from 'app/shared/SearchModels/catalogos/campoticketcaseta_search.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampoTicketCasetaService {

    apiURL = environment.apiURL;

  constructor(public http: HttpClient) { }


  obtenerPorId(id:string) {
    return this.http.get(environment.apiURL + 'campoTicketCaseta/'+ id);
  }

  obtenerCamposTicket(f:CampoTicketCasetaSearchModel) {
    return this.http.get(environment.apiURL + 'campoTicketCaseta/?nombre=' + (f.nombre != '' ? f.nombre : "%00")
    + '&descripcion=' + (f.descripcion != '' ? f.descripcion : "%00")
    + '&tipoDatoId=' + f.tipoDatoId
    + '&casetaId=' + f.casetaId);
  }

  obtenerTiposDato(f:CampoTicketCasetaSearchModel) {
    return this.http.get(environment.apiURL + 'caseta/?nombre=' + (f.nombre != '' ? f.nombre : '%00')
    + (f.descripcion != '' ? f.descripcion : '%00')
    + '&tipoDatoId=' + f.tipoDatoId
    + '&casetaId=' + f.casetaId);
  }

  actualizar(modelo:CampoTicketCaseta) {
    return this.http.put(environment.apiURL + 'campoTicketCaseta/', modelo);
  }

  insertar(modelo:CampoTicketCaseta) {
    return this.http.post(environment.apiURL + 'campoTicketCaseta/', modelo);
  }

  eliminar(id:string) {
    return this.http.delete(environment.apiURL + 'campoTicketCaseta/' + id);
  }

}
