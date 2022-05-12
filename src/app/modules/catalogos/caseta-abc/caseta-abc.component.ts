import { Component, ElementRef, OnInit,ChangeDetectorRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatTableDataSource } from '@angular/material/table';
import { CampoTicketCaseta } from 'app/shared/Models/catalogos/campoticketcaseta.model';
import { ListaGenericaService } from 'app/shared/Services/http/catalogos/listagenerica.service';
import { ListaGenericaSearchModel } from 'app/shared/SearchModels/catalogos/listagenerica_search.model';
import { Caseta } from 'app/shared/Models/catalogos/caseta.model';
import { ListaGenerica } from 'app/shared/Models/catalogos/listagenerica.model';
import { CampoTicketCasetaSearchModel } from 'app/shared/SearchModels/catalogos/campoticketcaseta_search.model';
import { CampoTicketCasetaService } from 'app/shared/Services/http/catalogos/campo-ticket-caseta.service';
import { CasetaAbcModalComponent } from '../caseta-abc-modal/caseta-abc-modal.component';
import { CarrilModalComponent } from '../carril-modal/carril-modal.component';
import { AzureFileProperties } from 'app/shared/SearchModels/catalogos/azureFileProperties_search.model';
import { BlobStorageService } from 'app/shared/Services/http/catalogos/blob-storage.service';
import { Peaje } from 'app/shared/Models/catalogos/peaje.model';
import { Carril } from 'app/shared/Models/catalogos/carril.model';
import { CarrilService } from 'app/shared/Services/http/catalogos/carril.service';
import { CasetaService } from 'app/shared/Services/http/catalogos/caseta.service';
import { CarrilSearchModel } from 'app/shared/SearchModels/catalogos/carrril_search.model';
import * as atlas from 'azure-maps-control';
import { Geocerca } from 'app/shared/Models/catalogos/geocerca.model';
import { RespuestaBd } from 'app/shared/Models/catalogos/respuesta_Bd.model';
import { CasetaSearchModel } from 'app/shared/SearchModels/catalogos/caseta_search.model';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

import { CampoTicketModalComponent } from '../campo-ticket-modal/campo-ticket-modal.component';
import * as _ from 'lodash';
import { GeocercaService } from 'app/shared/Services/http/catalogos/geocerca.service';
import { type } from 'os';
import { fuseAnimations } from '@fuse/animations';
import { PeajeService } from 'app/shared/Services/http/catalogos/peaje.service';
import { style } from '@angular/animations';
import { Console } from 'console';

import { IMapEvent, IMarkerEvent, SearchService,RouteService} from 'ng-azure-maps';
import * as atlasr from 'azure-maps-rest';
import * as atlasDraw from  'azure-maps-drawing-tools';


@Component({
  selector: 'app-caseta-abc',
  templateUrl: './caseta-abc.component.html',
  styleUrls: ['./caseta-abc.component.css'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  
})
export class CasetaAbcComponent implements OnInit {

  modelo: Caseta = new Caseta();
  modeloTicket: CampoTicketCaseta = new CampoTicketCaseta();
  modeloPeaje: Peaje = new Peaje();
  modeloCarril: Carril = new Carril();
  modeloGeocerca: Geocerca =  new Geocerca();

  id: string;

  smCaseta: CasetaSearchModel  = new CasetaSearchModel;
  resultadosCarril: Carril[] = [];
  resultados: CampoTicketCaseta[] = [];
  smCampoTicketCaseta: CampoTicketCasetaSearchModel = new CampoTicketCasetaSearchModel();
  smCarril: CarrilSearchModel = new CarrilSearchModel();


  srcResult: any;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;

  tiposDato: ListaGenerica[] = [];
  metodosPago: ListaGenerica[] = [];

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild( ToastContainerDirective , { static : true} ) toastContainer : ToastContainerDirective ;

  casetaAbcModalDialogRef: MatDialogRef<CasetaAbcModalComponent>;
  carrilModalDialogRef: MatDialogRef<CarrilModalComponent>;
  campoTicketCasetaModalDialogRef: MatDialogRef<CampoTicketModalComponent>;

  dataSource = new MatTableDataSource<any>();
  dataSourceCarril = new MatTableDataSource<any>();

  global_formData: FormData = new FormData();
  global_fileToUpload: File | null = null;
  global_ArchivoPropiedades: AzureFileProperties = new AzureFileProperties();

  global_obj_CampoTicketCaseta: CampoTicketCaseta = new CampoTicketCaseta();

  bNuevoCampoTicket: boolean = false;
  bEditarCampoTicket: boolean = false;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  Carriles: string[];
  Peajes: string[];
  TiposEje: ListaGenerica[] = [];
  ColumnsCarril: string[] = ['id', 'nombre', 'descripcion', 'aliasIave', 'edit'];
  ColumnsCampos: string[] = ['id', 'nombre', 'descripcion', 'nombreTipoDato', 'edit'];

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  bAgregarCarril: boolean  = false;
  ticketFrente: string = "";
  ticketAtras: string = "";

  metodoPago: string = "";

  public dataSourceGeocerca: atlas.source.DataSource;
  public fillOpacity = 0.5;
  public fillColor = '#1a73aa';
  public zoom = 15;
  public center = [-101.3339, 20.7838]


  trafficOptions : atlas.TrafficOptions = {
    flow: "none",
    incidents: false,
    showLogo : false,
  };

  global_obj_DataSource = new atlas.source.DataSource('source');
  global_obj_Mapa : atlas.Map;

  // global_mapStyles = ['road', 'grayscale_dark', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels']

  boundingBox = [-124.27734375000001, 10.726084296948196, -83.35351562500001, 40.17887331434698];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private toastr : ToastrService,
    private geocercaService: GeocercaService,
    private _matDialog: MatDialog,
    private campoTicketCasetaService: CampoTicketCasetaService,
    private casetaService: CasetaService,
    private carrilService: CarrilService,
    private peajeService: PeajeService,
    private listaGenericaService: ListaGenericaService,
    private blobstorageService: BlobStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.obtenerMetodosPago();
    this.obtenerTiposDato();
    this.obtenerTiposEje();
  }

  fn_OnReady(par_obj_MapEvent: IMapEvent){
    this.global_obj_Mapa = par_obj_MapEvent.map;
    this.global_obj_Mapa.setCamera({center: atlas.data.BoundingBox.getCenter(this.boundingBox),zoom:5,maxBounds :this.boundingBox,view: 'Auto'});
    this.iniciar();
  }

  fn_OnData(par_obj_MapEvent: IMapEvent){this.global_obj_Mapa = par_obj_MapEvent.map;}

  iniciar() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      if (this.id != null) {
        this.ngxService.start();
        this.obtenerCarriles(parseInt(this.id));
        this.obtenerCamposTicket(parseInt(this.id));
        this.obtenerCaseta(this.id);
      }
    });
  }

  cambioMetodoPago(event) {
    console.log(event);
    this.modelo

    if(this.modelo.metodoPagoId == 76) {
      this.ticketFrente = '';
      this.metodoPago = '';
      this.ticketAtras = '';
      this.modelo.url = '';
    }
  }

  obtenerCaseta(id: string) {
    this.casetaService.obtenerPorId(this.id).subscribe((res: Caseta) => {
      this.ngxService.stop();
      this.modelo = res;
      this.obtenerGeocerca(this.modelo.geocercaId);
      this.descargarImagenTicketAtras(this.modelo.archivoTicketAtras);
      this.descargarImagenTicketFrente(this.modelo.archivoTicketFrente);
      this.modelo.nombreGeocerca;
    },
      error => {
        this.ngxService.stop();
        console.log(error);
      });
  }

  obtenerCarriles(casetaId: number) {
    this.smCarril.casetaId = casetaId;
    this.carrilService.obtenerLista(this.smCarril).subscribe((res: Carril[]) => {
      this.resultadosCarril = res;
      console.log(this.resultadosCarril);
      this.aplicarDatosTablaCarril(res);
    }, error => {
      console.log(error);
    });
  }

  obtenerCamposTicket(casetaId: number) {
    this.smCampoTicketCaseta.casetaId = casetaId;
    this.campoTicketCasetaService.obtenerCamposTicket(this.smCampoTicketCaseta).subscribe((res: CampoTicketCaseta[]) => {
      this.resultados = res;
      this.aplicarDatosTablaCampoTicket(res);
    }, error => {
      console.log(error);
    });
  }

  obtenerMetodosPago() {
    let sm = new ListaGenericaSearchModel();
    sm.listaGenericaTipoId = 17;

    this.listaGenericaService.obtenerlista(sm).subscribe((res: ListaGenerica[]) => {
      this.metodosPago = res;
    })
  }

  obtenerTiposEje() {
    let sm = new ListaGenericaSearchModel();
    sm.listaGenericaTipoId = 19;

    this.listaGenericaService.obtenerlista(sm).subscribe((res: ListaGenerica[]) => {
      this.TiposEje= res;
    })
  }

  obtenerTiposDato() {
    let sm = new ListaGenericaSearchModel();
    sm.listaGenericaTipoId = 18;

    this.listaGenericaService.obtenerlista(sm).subscribe((res: ListaGenerica[]) => {
      this.tiposDato = res;
    })
  }


  aplicarDatosTablaCarril(res: any) {
    this.dataSourceCarril.paginator = this.paginator;
    this.dataSourceCarril.data = res;
  }

  aplicarDatosTablaCampoTicket(res: any) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = res;
  }

  subirImagenTicketFrente(ev: any) {
    console.log(ev.target.files[0]);
    this.global_formData = new FormData();
    this.global_fileToUpload = ev.target.files[0];
    this.global_formData.append("asset", ev.target.files[0], ev.target.files[0].name);
    this.global_ArchivoPropiedades.NombreArchivo = this.global_fileToUpload.name;
    this.global_ArchivoPropiedades.NombreOriginal = this.global_fileToUpload.name;
    this.global_ArchivoPropiedades.Extension = this.global_fileToUpload.name.split('.').pop();
    this.global_ArchivoPropiedades.Ruta = 'casetastickets';
    try{
      this.blobstorageService.subirImagenTicket(this.global_formData, this.global_ArchivoPropiedades).subscribe((respuesta:RespuestaBd)=>{

          this.modelo.archivoTicketFrente = respuesta.mensaje;
          this.descargarImagenTicketFrente(this.modelo.archivoTicketFrente);
          this.toastr.success('Imagen subida correctamente');

      }, error => {

        this.toastr.error('No se subio la imagen correctamente');
      });
      this.ngxService.stop();
    } catch {
      this.toastr.error('No se subio la imagen correctamente');
    }
  }

  descargarImagenTicketFrente(nombrerchivo: string){
    this.blobstorageService.descargarImagenTicket(nombrerchivo).subscribe((respuesta:RespuestaBd)=>{
       this.ticketFrente = respuesta.mensaje;
    });
  }

  subirImagenTicketAtras(ev: any) {
    console.log(ev.target.files[0]);
    this.global_formData = new FormData();
    this.global_fileToUpload = ev.target.files[0];
    this.global_formData.append("asset", ev.target.files[0], ev.target.files[0].name);
    this.global_ArchivoPropiedades.NombreArchivo = this.global_fileToUpload.name;
    this.global_ArchivoPropiedades.NombreOriginal = this.global_fileToUpload.name;
    this.global_ArchivoPropiedades.Extension = this.global_fileToUpload.name.split('.').pop();
    this.global_ArchivoPropiedades.Ruta = 'casetastickets';
    try{
      this.blobstorageService.subirImagenTicket(this.global_formData, this.global_ArchivoPropiedades).subscribe((respuesta:RespuestaBd)=>{

          this.modelo.archivoTicketAtras = respuesta.mensaje;
          this.descargarImagenTicketAtras(this.modelo.archivoTicketAtras);
          this.toastr.success('Imagen subida correctamente');

      }, error => {

        this.toastr.error('No se subio la imagen correctamente');
      });
      this.ngxService.stop();
    } catch {
      this.toastr.error('No se subio la imagen correctamente');
    }
  }

  descargarImagenTicketAtras(nombrerchivo: string){
    this.blobstorageService.descargarImagenTicket(nombrerchivo).subscribe((respuesta:RespuestaBd)=>{
       this.ticketAtras = respuesta.mensaje;
    });
  }

  fileClick(ev:any){
    ev.target.value = '';
    console.log('Se borro archivo anterior')
  }



  nuevoCampoTicket(idCaseta: number) {

    if(this.resultados.findIndex(x => x.id == 0) == -1){
        this.modeloTicket = new CampoTicketCaseta();
        this.resultados.push(this.modeloTicket);
        this.aplicarDatosTablaCampoTicket(this.resultados);
        this.editarCampoTicket(this.modeloTicket);
    }
  }

  editarCampoTicket(element: CampoTicketCaseta) {
    for(let v in this.dataSource.data){
        let e = this.dataSource.data[v];

        e.bEditable = false;
    }

    this.modeloTicket = element;
    element.bEditable = true;
    this.bNuevoCampoTicket = false;
    this.global_obj_CampoTicketCaseta = _.cloneDeep(element);

    if(element.id != 0){
        this.cancelarNuevoTicket();
    }
  }

  confirmarCampoTicket(element) {
    this.modeloTicket = element;
    this.modeloTicket.casetaId = this.modelo.id;

    if(this.modeloTicket.id > 0){
        this.campoTicketCasetaService.actualizar(this.modeloTicket).subscribe(
            (res: any) => {
              this.ngxService.stop();
              this.toastr.success('Campo guardado correctamente');
              this.obtenerCamposTicket(this.modelo.id);
            },
            error => {
              this.ngxService.stop();
              console.log(error);
              this.toastr.error('Campo no se guardo correctamente');
          })
          element.bEditable = false;
    }else {
        this.campoTicketCasetaService.insertar(this.modeloTicket).subscribe(
            (res: any) => {
              this.ngxService.stop();
              this.toastr.success('Campo guardado correctamente');
              this.obtenerCamposTicket(this.modelo.id);
            },
            error => {
              this.ngxService.stop();
              console.log(error);
              this.toastr.error('Campo no se guardo correctamente');
          })
          element.bEditable = false;
    }

  }

  cancelarAccionCampoTicket(element){
    element.bEditable = false;
    this.cancelarNuevoTicket();
  }

  cancelarNuevoTicket(){
    if(this.dataSource.data.findIndex(x => x.id == 0) > 0){
        this.resultados.pop()
        this.dataSource.data = this.resultados;
     }
  }


  editarCampoCarril(element: Carril) {
    element.bEditable = true;
    this.modeloCarril = element;
  }

  confirmarCampoCarril(element) {
    this.modeloCarril = element;

    this.carrilService.actualizar(this.modeloCarril).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.toastr.success('Campo guardado correctamente');
        this.id = this.modeloCarril.id.toString();
      },
      error => {
        this.ngxService.stop();
        console.log(error);
        this.toastr.error('Campo no se guardo correctamente');
      }
    )
    element.bEditable = false;
  }

  guardarCarril() {
    this.modeloCarril.casetaId = this.modelo.id;
    if (this.modeloCarril.id === 0) {
      this.modeloCarril.casetaId = this.modelo.id;
      this.carrilService.insertar(this.modeloCarril).subscribe(
        (res: any) => {
          this.toastr.success('Carril agregado correctamente');
          this.modeloCarril = res;
          this.id = this.modeloCarril.id.toString();
          console.log(res);
        },
        error => {
          console.log(error);
          this.toastr.error('Carril no se guardo correctamente');
        }
      )
    } else {
      this.carrilService.actualizar(this.modeloCarril).subscribe(
        (res: any) => {
          this.toastr.success('Carril actualizado correctamente');
          this.id = this.modeloCarril.id.toString();
        },
        error => {

          console.log(error);
          this.toastr.error('Carril no se guardo correctamente');
        }
      )
    }
  }

  guardarCaseta() {
    this.ngxService.start();
    if (this.modelo.id === 0) {
      this.casetaService.insertar(this.modelo).subscribe(
        (res: any) => {
          this.ngxService.stop();
          this.toastr.success('Caseta guardada correctamente');
          this.modelo = res;
          this.id = this.modelo.id.toString();
        },
        error => {
          this.ngxService.stop();
          console.log(error);
          this.toastr.error('Error en guardar caseta');
        }
      )
    } else {
      this.casetaService.actualizar(this.modelo).subscribe(
        (res: any) => {
          this.ngxService.stop();
          this.toastr.success('Caseta actualizada correctamente');
          this.id = this.modelo.id.toString();
          window.location.reload();
        },
        error => {
          this.ngxService.stop();
          console.log(error);
          this.toastr.error('Error en actualizar caseta');
        }
      )
    }
  }

  geocercaModal(id: number) {
    this.casetaAbcModalDialogRef = this._matDialog.open(CasetaAbcModalComponent, {
      disableClose: false,
      data: {
        id: id,
        casetaId: this.id
      },
      width: "65%",
      height: "97%"
    });

    this.casetaAbcModalDialogRef.afterClosed().subscribe(res => {
        if (res != null) {

          this.obtenerGeocerca(parseInt(res.id));
          // this.obtenerGeocerca(this.modelo.geocercaId);
          
          this.toastr.success('Geocerca seleccionada correctamente');
          this.modelo.nombreGeocerca;
          this.modeloGeocerca.nombre;
          this.modelo.geocercaId;

          this.modeloGeocerca = res;
          this.id = id.toString();

          this.center = [this.modeloGeocerca.punto.longitud, this.modeloGeocerca.punto.latitud]
          let vertices : [number,number][] =[]
          for(let position in res.poligono.puntos){
            vertices.push([res.poligono.puntos[position].longitud,res.poligono.puntos[position].latitud])
          }

          this.dataSourceGeocerca = new atlas.source.DataSource('source');
          this.dataSourceGeocerca.add(new atlas.data.Polygon(vertices));


          this.modelo.geocercaId;
          this.modeloGeocerca.id;
        }
        this.casetaAbcModalDialogRef = null;
    });
  }

  obtenerGeocerca(id:number){
    var local_obj_Formas = this.global_obj_DataSource.getShapes();

    this.geocercaService.obtenerPorId(id.toString()).subscribe((res: Geocerca) => {

      if(local_obj_Formas.length > 0)
        this.global_obj_DataSource.removeById(local_obj_Formas[0].getId());

            this.ngxService.stop();
            this.modeloGeocerca = res;
            this.modelo.geocercaId = id;
            
            if(this.modelo.nombreGeocerca == null)
            this.modelo.nombreGeocerca = "";
            if(this.modelo.nombreMetodoPago == null)
            this.modelo.nombreMetodoPago = "";

            this.global_obj_Mapa.setCamera({zoom:15,center:[this.modeloGeocerca.punto.longitud, this.modeloGeocerca.punto.latitud]})
            let vertices : [number,number][] =[]
                       
            for(let position in res.poligono.puntos){
              vertices.push([res.poligono.puntos[position].longitud,res.poligono.puntos[position].latitud])
            }
            //this.dataSourceGeocerca = new atlas.source.DataSource('source');
            //this.dataSourceGeocerca.clear();
            this.global_obj_DataSource.add(new atlas.data.Polygon(vertices)); 
            // console.log(vertices);

            this.modelo.nombreGeocerca;
            this.modeloGeocerca.nombre;
        },
        error => {
            this.ngxService.stop();
            console.log(error);
        });
  }

  carrilModal(idCarril: number) {
    console.log(idCarril)
    this.carrilModalDialogRef = this._matDialog.open(CarrilModalComponent, {
      data: {
        id: idCarril,
        casetaId: this.id
      },
      width: "50%",
      height: "64%"
    });

    this.carrilModalDialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.obtenerCarriles(parseInt(this.id));

      }
      this.carrilModalDialogRef = null;
    });
  }


  eliminarCampoTicketDialog(element: CampoTicketCaseta): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false,
    });
    this.confirmDialogRef.componentInstance.confirmTitle = 'Eliminar';
    this.confirmDialogRef.componentInstance.confirmMessage = '¿Estás seguro que quieres eliminar el campo?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngxService.start();
        this.campoTicketCasetaService.eliminar(`${element.id}`).subscribe((res: any) => {
          this.toastr.success('Se elimino el campo correctamente');
          this.obtenerCamposTicket(parseInt(this.id));
        },
          error => {
            console.log(error);
            this.ngxService.stop();
            this.toastr.error('No se elimino el campo correctamente');
          })
      }
      this.confirmDialogRef = null;
    });
  }

  eliminarCarrilDialog(element: Carril): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false,
    });
    this.confirmDialogRef.componentInstance.confirmTitle = 'Eliminar';
    this.confirmDialogRef.componentInstance.confirmMessage = '¿Estás seguro que quieres eliminar el carril?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngxService.start();
        this.carrilService.eliminar(`${element.id}`).subscribe((res: any) => {
          this.toastr.success('Se elimino el carril correctamente');
          this.obtenerCarriles(this.modelo.id);
        },
          error => {
            console.log(error);
            this.ngxService.stop();
            this.toastr.error('No se elimino el carril correctamente');
          })
      }
      this.confirmDialogRef = null;
    });
  }

  duplicarCarrilDialog(id:number): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false,
    });
    this.confirmDialogRef.componentInstance.confirmTitle = 'Duplicar';
    this.confirmDialogRef.componentInstance.confirmMessage = '¿Estás seguro que quieres duplicar el carril?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngxService.start();
        this.carrilService.carrilDuplicadoPorId(id).subscribe((res: any) => {
          this.toastr.success('Se duplico el carril correctamente');
          this.obtenerCarriles(this.modelo.id);
        },
          error => {
            console.log(error);
            this.ngxService.stop();
            this.toastr.success('No se duplico el carril correctamente');
          })
      }
      this.confirmDialogRef = null;
    });
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  mapReady() {
  }



  global_obj_Referencia:Peaje = new Peaje();
  bNuevaReferencia:boolean = false;
  bEditarReferencia:boolean = false;
  carrilIdSeleccionado: number = 0;

  fn_NuevaReferencia(carrilId){
    this.carrilIdSeleccionado = carrilId;
    this.bNuevaReferencia = true;
    this.bEditarReferencia = false;
    this.global_obj_Referencia = new Peaje();
  }
  fn_EditarReferencia(row:Peaje){
    this.bNuevaReferencia = false;
    this.bEditarReferencia = true;
    this.global_obj_Referencia = _.cloneDeep(row);
  }
  fn_GuardarReferencia(){
    if(this.global_obj_Referencia.id == 0){
      this.global_obj_Referencia.carrilId = this.carrilIdSeleccionado;
      this.peajeService.insertar(this.global_obj_Referencia).subscribe((res:Peaje) => {
        this.modeloCarril.peajes.push(res);
        this.global_obj_Referencia = new Peaje();
        this.fn_CancelarAgregarReferencia();
        this.obtenerCarriles(this.modelo.id);
        this.toastr.success('Se guardo el Peaje correctamente');
      },error => {
        this.toastr.error('No se guardo el Peaje correctamente');
      })
    }
    else{
      this.peajeService.actualizar(this.global_obj_Referencia).subscribe((res:Peaje) => {
        let index = _.findIndex(this.modeloCarril.peajes, ['id', res.id]);
        this.modeloCarril.peajes[index] = res;
        this.global_obj_Referencia = new Peaje();
        this.fn_CancelarAgregarReferencia();
        this.obtenerCarriles(this.modelo.id);
        this.toastr.success('Se actualizo el Peaje correctamente');
      },error => {
        this.toastr.error('No se actualizo el Peaje correctamente');
      })
    }
  }
  fn_CancelarAgregarReferencia(){
    this.bNuevaReferencia = false;
    this.bEditarReferencia = false;
    this.global_obj_Referencia = new Peaje();
  }
  fn_EliminarReferencia(referenciaId:number){
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmTitle = 'Eliminar';
    this.confirmDialogRef.componentInstance.confirmMessage = '¿Estás seguro que quieres eliminar esta referencia?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result)
        {
            this.peajeService.eliminar(referenciaId).subscribe((res)=>{
              this.obtenerCarriles(this.modelo.id);
              
                this.toastr.success('Se elimino el Peaje correctamente');

            },
            error => {

             this.toastr.error('No se elimino el Peaje correctamente');
             });
        }
        this.confirmDialogRef = null;
    });
  }
}

