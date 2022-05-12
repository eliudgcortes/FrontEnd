import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaGenericaTipoService } from 'app/shared/Services/http/catalogos/lista-generica-tipo.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ListaGenericaTipo } from 'app/shared/Models/catalogos/listagenericatipo.model';
import { FuseAlertType } from '@fuse/components/alert';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-lista-generica-tipo-abc',
  templateUrl: './lista-generica-tipo-abc.component.html',
  styleUrls: ['./lista-generica-tipo-abc.component.css']
})
export class ListaGenericaTipoAbcComponent implements OnInit {

  modelo: ListaGenericaTipo =  new ListaGenericaTipo();
  id:string;

  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: ''
  };
  showAlert: boolean = false;


    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource = new MatTableDataSource<any>();

  ListaGenericaTipoDialogRef: MatDialogRef<ListaGenericaTipoAbcComponent>;


  constructor(
      private ngxService: NgxUiLoaderService,
      private ListaGenericaTipoService: ListaGenericaTipoService,
      private router: Router,
      private route: ActivatedRoute,
      private _matDialog: MatDialog,
      private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      this.iniciar();
  }


  iniciar(){
      this.route.params.subscribe(params => {
          this.id = params['id']; // (+) converts string 'id' to a number

          if(this.id != null){
              //this.ngxService.start();
              this.obtenerListaGenericaTipo(this.id);
          }
      });
  }

  obtenerListaGenericaTipo(id:string){
      this.ListaGenericaTipoService.obtenerPorId(this.id).subscribe((res: ListaGenericaTipo) => {
                this.ngxService.stop();
                this.modelo = res;
          },
          error => {
              this.ngxService.stop();
              console.log(error);
          });
  }


    enviarFormulario(f: NgForm) {
        if (f.valid == true) {
            this.guardar(f);
        }
    }

    guardar(f: NgForm) {
        this.ngxService.start();
        console.log(this.modelo);

        if (this.modelo.id === 0) {
            this.ListaGenericaTipoService.insertar(this.modelo).subscribe(
                    (res: any) => {
                        this.ngxService.stop();
                        this.mensajeExito();
                        this.modelo = res;
                        this.id = this.modelo.id.toString();
                        this.router.navigate(['/catalogos/ListasGenericasTipo']);
                    },
                    error => {
                        this.ngxService.stop();
                        console.log(error);
                        this.mensajeError();
                    }
                )
        } else {
            this.ListaGenericaTipoService.actualizar(this.modelo).subscribe(
                    (res: any) => {
                        this.ngxService.stop();
                        this.mensajeExito();
                        this.id = this.modelo.id.toString();
                        this.router.navigate(['/catalogos/ListasGenericasTipo']);
                    },
                    error => {
                        this.ngxService.stop();
                        console.log(error);
                        this.mensajeError();
                    }
                )
        }
    }

    editarListaGenericaTipo(id:number){
        this.ListaGenericaTipoDialogRef = this._matDialog.open(ListaGenericaTipoAbcComponent, {
            disableClose: false,
            data: {
                id: id,
                ListaGenericaTipoId : this.id
              },
        });

        this.ListaGenericaTipoDialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.obtenerListaGenericaTipo(this.id);
                this.mensajeExito();
            }

            this.ListaGenericaTipoDialogRef = null;
          });
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
