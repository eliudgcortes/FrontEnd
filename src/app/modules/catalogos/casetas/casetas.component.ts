import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Caseta } from 'app/shared/Models/catalogos/caseta.model';
import { CasetaService } from 'app/shared/Services/http/catalogos/caseta.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CasetaAbcComponent } from '../caseta-abc/caseta-abc.component';
import { CasetaSearchModel } from 'app/shared/SearchModels/catalogos/caseta_search.model';
import { FuseConfigService } from '@fuse/services/config';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseAlertType } from '@fuse/components/alert';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-casetas',
  templateUrl: './casetas.component.html',
  styleUrls: ['./casetas.component.css'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class CasetasComponent implements OnInit {

  modelo: Caseta = new Caseta();
  id: string;

  sm: CasetaSearchModel = new CasetaSearchModel();
  resultados: Caseta[] = [];

  cols: string[] = ['id', 'nombre', 'descripcion', 'aliasIave', 'nombreMetodoPago','accion'];
  filterCols: string[] = ['nombre', 'descripcion'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  estatus: boolean;

  dataSource = new MatTableDataSource<any>();

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  casetaDialogRef: MatDialogRef<CasetaAbcComponent>;
  eliminaCasetaDialogRef: MatDialogRef<CasetasComponent>;

  // alert: { type: FuseAlertType; message: string } = {
  //   type: 'success',
  //   message: ''
  // };
  // showAlert: boolean = false;

  constructor(
    // private _fuseConfigService: FuseConfigService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private _matDialog: MatDialog,
    private casetaService: CasetaService,
  ) { }

  ngOnInit(): void {
    this.obtenerLista();
  }

  aplicarDatosTabla(res: any) {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.paginator.pageSize = 10;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = res;
    this.changeDetectorRef.detectChanges();
  }

  filtrarDatos(Filtro: string, filterCols: string[]): any {
    let datosFiltrados;
    if (Filtro != "") {
      datosFiltrados = this.resultados.filter(x =>
        filterCols.some(col => x[col].toLocaleLowerCase().trim().includes(Filtro))
      );

    } else {
      datosFiltrados = this.resultados
    }
    return datosFiltrados
  }

  aplicarFiltro(filtro: string) {
    this.aplicarDatosTabla(this.filtrarDatos(filtro, this.filterCols))
  }

  obtenerLista() {
    this.ngxService.start();
    this.casetaService.obtenerLista(this.sm).subscribe((res: Caseta[]) => {
      this.ngxService.stop();
      this.resultados = res;

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
    this.confirmDialogRef.componentInstance.confirmMessage = '¿Estás seguro que quieres eliminar la Caseta?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngxService.start();
        this.casetaService.eliminar(id).subscribe((res: any) => {
          // this.mensajeExito();
          this.toastr.success('Caseta eliminada correctamente');
          this.obtenerLista();
        },
          error => {
            console.log(error);
            this.ngxService.stop();
            this.toastr.error('Error en eliminar caseta');
            // this.mensajeError();
          })
      }
      this.confirmDialogRef = null;
    });
  }


}