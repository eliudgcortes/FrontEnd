import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AzureFileProperties } from 'app/shared/SearchModels/catalogos/azureFileProperties_search.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {

  constructor(public http: HttpClient) { }

  importarArchivo(fileToUpload: FormData, archivoPropiedades: AzureFileProperties) {
    fileToUpload.append('jsonConfiguracion', JSON.stringify(archivoPropiedades));
    return this.http.post(environment.apiURL + 'BlobStorage/InsertFile/',fileToUpload);
  }

  // descargarExcelArchivo(nombreArchivo: string){
  //   return this.http.get(environment.apiURL + 'BlobStorage/DownloadFile/'+ nombreArchivo);
  // }
}
