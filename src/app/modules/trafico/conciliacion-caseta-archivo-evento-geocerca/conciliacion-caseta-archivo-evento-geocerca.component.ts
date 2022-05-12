import { Component, OnInit } from '@angular/core';
import { ConciliacionCasetaArchivoEventoGeocerca } from 'app/shared/Models/trafico/conciliacion-caseta-archivo-evento-geocerca.model';
import { ConciliacionCasetaArchivoEvento } from 'app/shared/Models/trafico/conciliacion-caseta-archivo-evento.model';

@Component({
  selector: 'app-conciliacion-caseta-archivo-evento-geocerca',
  templateUrl: './conciliacion-caseta-archivo-evento-geocerca.component.html',
  styleUrls: ['./conciliacion-caseta-archivo-evento-geocerca.component.scss']
})
export class ConciliacionCasetaArchivoEventoGeocercaComponent implements OnInit {

  modelo: ConciliacionCasetaArchivoEventoGeocerca = new ConciliacionCasetaArchivoEventoGeocerca();
  id: string;

  constructor() { }

  ngOnInit(): void {
  }

}
