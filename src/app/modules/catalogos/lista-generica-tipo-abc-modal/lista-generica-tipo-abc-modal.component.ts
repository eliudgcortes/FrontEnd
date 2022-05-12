import { Component, Inject, OnInit } from '@angular/core';
import { FuseAlertType } from '@fuse/components/alert';
import { ListaGenericaTipo } from 'app/shared/Models/catalogos/listagenericatipo.model';
import { ListaGenericaTipoService } from 'app/shared/Services/http/catalogos/lista-generica-tipo.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-generica-tipo-abc-modal',
  templateUrl: './lista-generica-tipo-abc-modal.component.html',
  styleUrls: ['./lista-generica-tipo-abc-modal.component.scss']
})
export class ListaGenericaTipoAbcModalComponent implements OnInit {

  modelo: ListaGenericaTipo = new ListaGenericaTipo();
  id: number;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;

  ListaGenericaTipoDialogRef: MatDialogRef<ListaGenericaTipoAbcModalComponent>;

  constructor(
    private ListaGenericaTipoService: ListaGenericaTipoService,
    private router: Router,
    private _matDialog: MatDialog,
    private dialogRef: MatDialogRef<ListaGenericaTipoAbcModalComponent>,
    private ngxService: NgxUiLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.modelo.id = this.data.id;
  }


  eliminar(element: ListaGenericaTipo): void {
    this.ListaGenericaTipoService
      .eliminar(`${element.id}`)
      .subscribe(
        (res: any) => {
          this.ngxService.stop();
          this.mensajeExito();
          window.location.reload();
        },
        error => {
          this.ngxService.stop();
          console.log(error);
          this.mensajeError();
        }
      )
  }

  regresar() {
    this.dialogRef.close({ data: this.modelo });
  }

  regresarCancelar() {
    this.dialogRef.close();
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
