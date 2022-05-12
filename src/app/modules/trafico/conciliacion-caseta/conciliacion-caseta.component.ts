import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConciliacionCaseta } from 'app/shared/Models/trafico/conciliacion-caseta.model';
import { ConciliacionCasetaSearchModel } from 'app/shared/SearchModels/trafico/conciliacion-caseta_search.model';
import { ConciliacionCasetaService } from 'app/shared/Services/http/trafico/conciliacion-caseta.service';
import moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConciliacionCasetaAbcComponent } from '../conciliacion-caseta-abc/conciliacion-caseta-abc.component';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-conciliacion-caseta',
  templateUrl: './conciliacion-caseta.component.html',
  styleUrls: ['./conciliacion-caseta.component.scss']
})
export class ConciliacionCasetaComponent implements OnInit {

  modeloCaseta: ConciliacionCaseta = new ConciliacionCaseta();
  idCaseta: string;

  sm: ConciliacionCasetaSearchModel= new ConciliacionCasetaSearchModel();
  resultados: ConciliacionCaseta[] = [];

  cols: string[] = ['id', 'claveRed', 'empresa', 'inicioPeriodo', 'finPeriodo', 'accion'];
  filterCols: string[] = ['claveRed', 'inicioPeriodo'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<any>();

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private conciliacionCasetaService: ConciliacionCasetaService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.sm.fechaInicio = moment().format('YYYY-MM-DD')
    this.sm.fechaFin = moment().format('YYYY-MM-DD')

    this.obtenerConciliacionCasetaLista();

    this.iniciar();
  }

  iniciar(){
    this.route.params.subscribe(params => {
        this.idCaseta = params['id']; // (+) converts string 'id' to a number

    });
  }

  aplicarDatosTabla(res: any) {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.paginator.pageSize = 10;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = res;
    this.changeDetectorRef.detectChanges();
  }

  filtrarDatos(filtro: string, filterCols: string[]): any {
    let datosFiltrados;
    if (filtro != "") {
        datosFiltrados = this.resultados.filter(x =>
            filterCols.some(col => x[col].toLocaleLowerCase().trim().includes(filtro))
        );

    } else  {
        datosFiltrados = this.resultados
    }
    return datosFiltrados
  }

  aplicarFiltro(filtro: string){
    this.aplicarDatosTabla(this.filtrarDatos(filtro, this.filterCols))
  }

  obtenerConciliacionCasetaLista() {
    console.log(this.sm);

    this.ngxService.start();
    this.conciliacionCasetaService.obtenerLista(this.sm).subscribe((res: ConciliacionCaseta[]) => {
      this.ngxService.stop();
      this.resultados = res;
      console.log(this.resultados);

      this.aplicarDatosTabla(res);
    }, error => {
      console.log(error);
      this.ngxService.stop();
    });
  }

  eliminar(id: number) {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false,

    });
    this.confirmDialogRef.componentInstance.confirmTitle = 'Eliminar';
    this.confirmDialogRef.componentInstance.confirmMessage = '¿Estás seguro que quieres eliminar la Conciliación Caseta?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngxService.start();
        this.conciliacionCasetaService.eliminar(id).subscribe((res: any) => {
          // this.mensajeExito();
          // this.toastr.success('Conciliación Caseta ha sido eliminada correctamente');
          this.obtenerConciliacionCasetaLista();
        },
          error => {
            console.log(error);
            this.ngxService.stop();
            // this.toastr.error('Error al eliminar Conciliación Caseta');
            // this.mensajeError();
          })
      }
      this.confirmDialogRef = null;
    });
  }
}
