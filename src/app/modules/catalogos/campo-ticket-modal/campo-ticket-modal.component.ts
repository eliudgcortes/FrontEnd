import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseAlertType } from '@fuse/components/alert';
import { CampoTicketCaseta } from 'app/shared/Models/catalogos/campoticketcaseta.model';
import { Caseta } from 'app/shared/Models/catalogos/caseta.model';
import { ListaGenerica } from 'app/shared/Models/catalogos/listagenerica.model';
import { CampoTicketCasetaSearchModel } from 'app/shared/SearchModels/catalogos/campoticketcaseta_search.model';
import { ListaGenericaSearchModel } from 'app/shared/SearchModels/catalogos/listagenerica_search.model';
import { CampoTicketCasetaService } from 'app/shared/Services/http/catalogos/campo-ticket-caseta.service';
import { ListaGenericaService } from 'app/shared/Services/http/catalogos/listagenerica.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-campo-ticket-modal',
  templateUrl: './campo-ticket-modal.component.html',
  styleUrls: ['./campo-ticket-modal.component.scss']
})
export class CampoTicketModalComponent implements OnInit {

  modelo: Caseta = new Caseta;
  modeloTicket: CampoTicketCaseta = new CampoTicketCaseta();
  
  smCampoTicketCaseta: CampoTicketCasetaSearchModel = new CampoTicketCasetaSearchModel();

  id:string;
  idnumber: number;

  tiposDato: ListaGenerica[] = [];
  resultados: CampoTicketCaseta[] = [];


  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;

  constructor(
    private campoTicketCasetaService: CampoTicketCasetaService,
    private ngxService: NgxUiLoaderService,
    private listaGenericaService: ListaGenericaService,
    private dialogRef: MatDialogRef<CampoTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.modeloTicket.casetaId = this.data.casetaId;
  
    if(this.idnumber > 0)
    this.obtenerCampoTicket(this.id.toString());

    this.obtenerTiposDato();
  }

  obtenerTiposDato() {
    let sm = new ListaGenericaSearchModel();
    sm.listaGenericaTipoId = 53;

    this.listaGenericaService.obtenerlista(sm).subscribe((res: ListaGenerica[]) => {
      this.tiposDato = res;
    })
  }

  obtenerCampoTicket(id: string) {
    this.campoTicketCasetaService.obtenerPorId(id).subscribe((res: CampoTicketCaseta) => {
      this.ngxService.stop();
      this.modeloTicket = res;

      }, error => {
      this.ngxService.stop();
      console.log(error);

    });
  }
  
  guardar() {
    if (this.modeloTicket.id === 0) {
        this.campoTicketCasetaService.insertar(this.modeloTicket).subscribe(
                (res: any) => {
                    this.mensajeExito();
                    this.regresar()
                },
                error => {

                    console.log(error);
                    this.mensajeError();
                    this.regresarCancelar();
                }
            )
    } else {
        this.campoTicketCasetaService.actualizar(this.modeloTicket).subscribe(
                (res: any) => {

                    this.mensajeExito();
                    this.idnumber = this.modeloTicket.id;
                    this.regresar();
                },
                error => {

                    console.log(error);
                    this.mensajeError();
                    this.regresarCancelar();
                }
            )
    }
  }

  regresarCancelar(){
    this.dialogRef.close(null);
  }

  regresar(){
    this.dialogRef.close({data: this.modelo});
  }

  mensajeExito() {
    this.showAlert = false;
    // Set the alert
    this.alert = {
      type: 'success',
      message: 'Se completo la acción'
    };
    // Show the alert
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false
    }, 5000)
  }

  mensajeError() {
    this.showAlert = false;
    // Set the alert
    this.alert = {
      type: 'error',
      message: 'No se completo la acción'
    };
    // Show the alert
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false
    }, 5000)
  }

}
