import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AzureFileProperties } from 'app/shared/SearchModels/catalogos/azureFileProperties_search.model';

@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {

  apiURL = environment.apiURL;

  constructor(public http: HttpClient) { }

  subirImagenTicket(fileToUpload: FormData, archivoPropiedades: AzureFileProperties) {
    fileToUpload.append('jsonConfiguracion', JSON.stringify(archivoPropiedades));
    return this.http.post(environment.apiURL + 'BlobStorage/InsertFile/',fileToUpload);
  }

  descargarImagenTicket(nombreArchivo: string){
    return this.http.get(environment.apiURL + 'BlobStorage/DownloadFile/'+ nombreArchivo);
  }
}
