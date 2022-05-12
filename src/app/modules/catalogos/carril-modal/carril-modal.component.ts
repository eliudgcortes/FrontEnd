import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { Carril } from 'app/shared/Models/catalogos/carril.model';
import { Caseta } from 'app/shared/Models/catalogos/caseta.model';
import { CarrilService } from 'app/shared/Services/http/catalogos/carril.service';
import { CasetaService } from 'app/shared/Services/http/catalogos/caseta.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-carril-modal',
  templateUrl: './carril-modal.component.html',
  styleUrls: ['./carril-modal.component.scss']
})
export class CarrilModalComponent implements OnInit {

  modeloCarril: Carril = new Carril();
  modelo: Caseta =  new Caseta();
  id:number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;

  dataSource = new MatTableDataSource<any>();

  constructor(
    private ngxService: NgxUiLoaderService,
    private carrilService: CarrilService,
    private dialogRef: MatDialogRef<CarrilModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.modeloCarril.casetaId = this.data.casetaId;
    this.modeloCarril.id = this.data.id;


    if(this.id > 0)
    this.obtenerCarril(this.id.toString());
  }


  obtenerCarril(id: string) {
    this.carrilService.obtenerPorId(id).subscribe((res: Carril) => {
      this.ngxService.stop();
      this.modeloCarril = res;

      }, error => {
      this.ngxService.stop();
      console.log(error);

    });
  }

  guardar() {
    if (this.modeloCarril.id === 0) {
        this.carrilService.insertar(this.modeloCarril).subscribe(
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
        this.carrilService.actualizar(this.modeloCarril).subscribe(
                (res: any) => {

                    this.mensajeExito();
                    this.id = this.modeloCarril.id;
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
