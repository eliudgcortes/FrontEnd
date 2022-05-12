import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConciliacionCasetaArchivoEventoGeocerca } from 'app/shared/Models/trafico/conciliacion-caseta-archivo-evento-geocerca.model';
import { ConciliacionCasetaArchivoEvento } from 'app/shared/Models/trafico/conciliacion-caseta-archivo-evento.model';
import { ConciliacionCasetaArchivo } from 'app/shared/Models/trafico/conciliacion-caseta-archivo.model';
import { ConciliacionCaseta } from 'app/shared/Models/trafico/conciliacion-caseta.model';
import { ExcelService } from 'app/shared/Services/http/trafico/excel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';
import { ConciliacionCasetaService } from 'app/shared/Services/http/trafico/conciliacion-caseta.service';
import moment from 'moment';
import { ConciliacionCasetaSearchModel } from 'app/shared/SearchModels/trafico/conciliacion-caseta_search.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-conciliacion-caseta-abc',
  templateUrl: './conciliacion-caseta-abc.component.html',
  styleUrls: ['./conciliacion-caseta-abc.component.scss']
})
export class ConciliacionCasetaAbcComponent implements OnInit {

  modeloCaseta: ConciliacionCaseta = new ConciliacionCaseta();
  idCaseta: string;

  modeloArchivo: ConciliacionCasetaArchivo = new ConciliacionCasetaArchivo();
  idArchivo: string;

  modeloEvento: ConciliacionCasetaArchivoEvento = new ConciliacionCasetaArchivoEvento();
  idEvento: string;

  modeloGeocerca: ConciliacionCasetaArchivoEventoGeocerca = new ConciliacionCasetaArchivoEventoGeocerca();
  idGeocerca: string;

  sm: ConciliacionCasetaSearchModel= new ConciliacionCasetaSearchModel();
  resultados: ConciliacionCaseta[] = [];

  cols: string[] = ['conciliado', 'origen', 'tractor', 'tag', 'fecha', 'hora', 'caseta', 'carril', 'ejes', 'importe', 'ejesConciliacion', 'carrilConciliacion',
   'importeConciliacion', 'motivoDiferencia', 'estatus', 'accion'];
  filterCols: string[] = ['origen', 'tractor'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<any>();

  @Input() progress = 0;
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  dataString: any;
  fileName: any;

  constructor(
    private _matDialog: MatDialog,
    private toastr : ToastrService,
    private ngxService: NgxUiLoaderService,
    public xls: ExcelService,
    private router: Router,
    private route: ActivatedRoute,
    private conciliacionCasetaService: ConciliacionCasetaService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    //this.obtenerConciliacionCasetaLista();

    // this.conciliacionCasetaService.obtenerPrueba().subscribe((algo:any) => {
    //   console.log('Si lo hice bien')
    //   console.log(algo);
    // },error => {
    //   console.log(error);
    // })

    // console.log(this.obtenerConciliacionCasetaLista);.
    this.iniciar();
  }

  iniciar() {
    this.route.params.subscribe(params => {
      this.idCaseta = params['id']; // (+) converts string 'id' to a number

      if (this.idCaseta != null) {
        this.ngxService.start();
        this.obtenerConciliacionCasetaId(this.idCaseta);
      }
    });
  }

  obtenerConciliacionCasetaId(id: string) {
    this.conciliacionCasetaService.obtenerPorId(this.idCaseta).subscribe((res: ConciliacionCaseta) => {
      this.ngxService.stop();
      this.modeloCaseta = res;
      // this.obtenerGeocerca(this.modelo.geocercaId);
      // this.modelo.nombreGeocerca;
    },
      error => {
        this.ngxService.stop();
        console.log(error);
      });
  }

  obtenerConciliacionCasetaLista() {
    this.conciliacionCasetaService.obtenerLista(this.sm).subscribe((res: ConciliacionCaseta[]) => {
      this.resultados = res;
      console.log(this.resultados);
      // this.aplicarDatosTablaCarril(res);
    }, error => {
      console.log(error);
    });
  }

  guardarConciliacionCaseta() {
    this.ngxService.start();
    console.log(this.modeloCaseta);
    
    this.modeloCaseta.fechaInicio = moment(this.modeloCaseta.fechaInicio).format('YYYY-MM-DD')
    this.modeloCaseta.fechaFin = moment(this.modeloCaseta.fechaFin).format('YYYY-MM-DD')

    // this.modeloCaseta.fechaInicio = moment(this.modeloCaseta.fechaInicio).format('yyyy-MM-ddThh:mm')
    // this.modeloCaseta.fechaFin = moment(this.modeloCaseta.fechaFin).format('yyyy-MM-ddThh:mm')
    
    if (this.modeloCaseta.id === 0) {
      this.conciliacionCasetaService.insertar(this.modeloCaseta).subscribe(
        (res: any) => {
          this.ngxService.stop();
          this.toastr.success('Conciliación Caseta ha sido guardado correctamente.');
          this.modeloCaseta = res;
          this.idCaseta = this.modeloCaseta.id.toString();
          this.router.navigate(['/trafico/ConciliacionCaseta']);
        },
        error => {
          this.ngxService.stop();
          console.log(error);
          this.toastr.error('Error al guardar Conciliación Caseta.');
        }
      )
    } else {
      this.conciliacionCasetaService.actualizar(this.modeloCaseta).subscribe(
        (res: any) => {
          this.ngxService.stop();
          this.toastr.success('Conciliación Caseta ha sido actualizado correctamente.');
          this.idCaseta = this.modeloCaseta.id.toString();
          this.router.navigate(['/trafico/ConciliacionCaseta']);
          window.location.reload();
        },
        error => {
          this.ngxService.stop();
          console.log(error);
          this.toastr.error('Error al actualizar Conciliación Caseta.');
        }
      )
    }
  }

  // importarModal(id: number) {
  //   this.importarModalDialogRef = this._matDialog.open(ConciliacionCasetaArchivoModalComponent, {
  //     disableClose: false,
  //     data: {
  //       id: id,
  //       Id: this.idArchivo
  //     },
  //     width: "75%",
  //     height: "65%"
  //   });

  //   this.importarModalDialogRef.afterClosed().subscribe(res => {
  //       if (res != null) {
         
  //         this.toastr.success('Texto de alerta');
  //       }
  //       this.importarModalDialogRef = null;
  //   });
  // }
}