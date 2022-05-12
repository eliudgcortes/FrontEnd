import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListaGenericaTipoSearchModel} from 'app/shared/SearchModels/catalogos/listagenericatipo_search.model';
import { ListaGenericaTipoService } from 'app/shared/Services/http/catalogos/lista-generica-tipo.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ListaGenericaTipo } from 'app/shared/Models/catalogos/listagenericatipo.model';
import { FuseAlertType } from '@fuse/components/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListaGenericaTipoAbcModalComponent } from '../lista-generica-tipo-abc-modal/lista-generica-tipo-abc-modal.component';


@Component({
  selector: 'app-lista-generica-tipo',
  templateUrl: './lista-generica-tipo.component.html',
  styleUrls: ['./lista-generica-tipo.component.css']
})


export class ListaGenericaTipoComponent implements OnInit {

  sm: ListaGenericaTipoSearchModel= new ListaGenericaTipoSearchModel();
  resultados: ListaGenericaTipo[] = [];

  cols: string[] = ['id','nombre', 'descripcion', 'accion', ];
  filterCols: string[] = ['nombre', 'descripcion'];

  modelo: ListaGenericaTipo =  new ListaGenericaTipo();
  id:string;

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
    };
    showAlert: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any>();

  ListaGenericaTipoDialogRef: MatDialogRef<ListaGenericaTipoAbcModalComponent>;


  constructor(
      private ListaGenericaTipoService: ListaGenericaTipoService,
      private changeDetectorRef: ChangeDetectorRef,
      private ngxService: NgxUiLoaderService,
      private _matDialog: MatDialog,
      private router: Router,
      private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
      this.obtenerLista();
  }

  aplicarDatosTabla(res: any) {
        this.paginator._intl.itemsPerPageLabel = 'ELEMENTOS POR PÁGINA';
        this.paginator.pageSize = 10;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = res;
        this.changeDetectorRef.detectChanges();
  }
  
  filtrarDatos(str_Filtro: string, filterCols: string[]): any {
      let datosFiltrados;
      if (str_Filtro != "") {
          datosFiltrados = this.resultados.filter(x =>
              filterCols.some(col => x[col].toLocaleLowerCase().trim().includes(str_Filtro))
          );

      } else  {
          datosFiltrados = this.resultados
      }
      return datosFiltrados
  }

  aplicarFiltro(str_Filtro: string){
      this.aplicarDatosTabla(this.filtrarDatos(str_Filtro, this.filterCols))
  }

  obtenerLista(){
      this.ngxService.start();
      this.ListaGenericaTipoService.obtenerLista(this.sm).subscribe((res:ListaGenericaTipo[]) => {
          this.ngxService.stop();
          this.resultados = res;
          
          this.aplicarDatosTabla(res);
      }, error => {
          console.log(error);
          this.ngxService.stop();
      });
  }

    eliminarListaGenericaTipo(idListaGenericaTipo:number){
        this.ListaGenericaTipoDialogRef = this._matDialog.open(ListaGenericaTipoAbcModalComponent, {
            disableClose: false,
            data: {
                id: idListaGenericaTipo,
                listaGenericaTipoId : this.id
            },
            width: "40%",
            height: "auto"
        });

        this.ListaGenericaTipoDialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                // this.obtenerCuentasCliente(parseInt(this.id));
                this.mensajeExito();
            }

            this.ListaGenericaTipoDialogRef = null;
        });
    }

    eliminar(element: ListaGenericaTipo): void {
        this.ListaGenericaTipoService
        .eliminar(`${element.id}`)
        .subscribe(
            (res: any) => {
                this.ngxService.stop();
                this.mensajeExito();
                
            },
            error => {
                this.ngxService.stop();
                console.log(error);
                this.mensajeError();
            }
        )
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


