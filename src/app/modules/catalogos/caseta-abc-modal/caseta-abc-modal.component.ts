import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Geocerca } from 'app/shared/Models/catalogos/geocerca.model';
import { GeocercaSearchModel } from 'app/shared/SearchModels/catalogos/geocerca_search.model';
import { GeocercaService } from 'app/shared/Services/http/catalogos/geocerca.service';
import * as atlas from 'azure-maps-control';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { IMapEvent } from 'ng-azure-maps';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-caseta-abc-modal',
  templateUrl: './caseta-abc-modal.component.html',
  styleUrls: ['./caseta-abc-modal.component.scss'],
 encapsulation: ViewEncapsulation.None,
})
export class CasetaAbcModalComponent implements OnInit {

  myControl = new FormControl();

  modelo: Geocerca =  new Geocerca();
  modeloGeocerca: Geocerca =  new Geocerca();
  id:string;
  geocercas:Geocerca[]=[];

  sm: GeocercaSearchModel= new GeocercaSearchModel();
  resultados: Geocerca[] = [];

  cols: string[] = ['id','nombre', 'ubicacion', 'accion'];
  filterCols: string[] = ['nombre', 'ubicacion'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };
  showAlert: boolean = false;

  dataSource = new MatTableDataSource<any>();

  public global_obj_Mapa : atlas.Map;
  public dataSourceGeocerca: atlas.source.DataSource = new atlas.source.DataSource('source');
  public fillOpacity = 0.5;
  public fillColor = '#1a73aa';
  public zoom = 15;
  public center = [-101.3339, 20.7838]

  constructor(
    private toastr : ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CasetaAbcModalComponent>,
    private router: Router,
    private route: ActivatedRoute,
    private geocercaService: GeocercaService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.obtenerListaGeocerca();
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

  obtenerGeocerca(id:number){
    this.geocercaService.obtenerPorId(id.toString()).subscribe((res: Geocerca) => {
            this.ngxService.stop();
            this.modeloGeocerca = res;
            this.id = id.toString();

            this.center = [this.modeloGeocerca.punto.longitud, this.modeloGeocerca.punto.latitud]
            // this.global_obj_Mapa.setCamera({zoom:15,center:[this.modeloGeocerca.punto.longitud, this.modeloGeocerca.punto.latitud]})
            let vertices : [number,number][] =[]
            for(let position in res.poligono.puntos){
              vertices.push([res.poligono.puntos[position].longitud,res.poligono.puntos[position].latitud])
            }
            this.sm.nombre = "";
            this.dataSourceGeocerca.add(new atlas.data.Polygon(vertices));
        },
        error => {
            this.ngxService.stop();
            console.log(error);
        });
  }

  obtenerListaGeocerca(){
    this.ngxService.start();
    this.sm.numeroElementos = 20;
    this.geocercaService.obtenerListaTabla(this.sm).subscribe((res:Geocerca[]) => {
        this.ngxService.stop();


        this.geocercas = res;
    }, error => {
        console.log(error);
        this.ngxService.stop();
    });
  }

  mapReady() {

  }

  selecciona(geocercaId: string){
    this.dialogRef.close({id: geocercaId});
  }

  guardar() {
    this.ngxService.start();
    if (this.modelo.id === 0) {
        this.geocercaService.insertar(this.modelo).subscribe(
          (res: any) => {
              this.ngxService.stop();
              this.toastr.success('Geocerca seleccionada correctamente');
              this.modelo = res;
              this.id = this.modelo.id.toString();
              this.router.navigate(["'/catalogos/Casetas-abc'"]);
          },
          error => {
              this.ngxService.stop();
              console.log(error);
              this.toastr.error('Error en seleccionar geocerca');
          }
        )
    } else {
      this.geocercaService.actualizar(this.modelo).subscribe(
        (res: any) => {
            this.ngxService.stop();
            this.toastr.success('Geocerca actualizada correctamente');
            this.id = this.modelo.id.toString();
            this.router.navigate(["'/catalogos/Casetas-abc'"]);
        },
        error => {
            this.ngxService.stop();
            console.log(error);
            this.toastr.error('Error en actualizar Geocerca');
        }
      )
    }
  }

  regresarCancelar(){
    this.dialogRef.close(null);
  }
}
