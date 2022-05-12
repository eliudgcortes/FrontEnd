import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ListaGenerica } from 'app/shared/Models/catalogos/listagenerica.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FuseAlertType } from '@fuse/components/alert';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ListaGenericaService } from 'app/shared/Services/http/catalogos/listagenerica.service';

@Component({
  selector: 'app-listagenerica-abc',
  templateUrl: './listagenerica-abc.component.html',
  styleUrls: ['./listagenerica-abc.component.scss']
})
export class ListagenericaAbcComponent implements OnInit {

  modelo: ListaGenerica =  new ListaGenerica();
  id: string;

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert: boolean = false;
  constructor(
      private listaGenericaService: ListaGenericaService,
      private router : Router,
      private ngxService: NgxUiLoaderService,
      private route: ActivatedRoute,
      private changeDetectorRef: ChangeDetectorRef,
      private _matDialog:MatDialog
     
      ) { }

  ngOnInit(): void {
    this.iniciar();
  }

  iniciar(){
    this.route.params.subscribe(params => {
        this.id = params['id']; // (+) converts string 'id' to a number

        this.modelo.listaGenericaTipoId = + params['listaGenericaTipoId'];
        if(this.id != null){
            this.ngxService.start();
            this.obtenerlista(this.id);
        }
    });
  }

  enviarFormulario(f: NgForm) {
      if (f.valid == true) {
          this.guardar(f);
      }
  }

  obtenerlista(id:string){
      this.listaGenericaService.obtenerPorId(this.id).subscribe((res: ListaGenerica) => {
             // this.ngxService.stop();
              this.modelo = res;
          },
          error => {
           // this.ngxService.stop();
            console.log(error);
        });
  }

  guardar(f: NgForm) {
    this.ngxService.start();
   console.log(this.modelo);

    if (this.modelo.id === 0) {
        this.listaGenericaService.insertar(this.modelo).subscribe(
                (res: any) => {
                   // this.ngxService.stop();
                    this.mensajeExito();
                    this.modelo = res;
                    this.id = this.modelo.id.toString();
                },
                error => {
                   // this.ngxService.stop();
                    console.log(error);
                    this.mensajeError();
                }
            )
    } else {
        this.listaGenericaService.actualizar(this.modelo).subscribe(
                (res: any) => {
                  //  this.ngxService.stop();
                    this.mensajeExito();
                    this.id = this.modelo.id.toString();
                },
                error => {
                    this.ngxService.stop();
                    console.log(error);
                  //  this.mensajeError();
                }
            )
    }
}

 

  mensajeExito() {
    this.showAlert = false;
    // Set the alert
    this.alert = {
        type   : 'success',
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
        type   : 'error',
        message: 'No se completo la acción'
    };
    // Show the alert
    this.showAlert = true;
    setTimeout(() => {
        this.showAlert = false
    }, 5000)
  }
}

