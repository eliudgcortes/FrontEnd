import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaBd } from 'app/shared/Models/trafico/respuesta_Bd.model';
import { ConciliacionCasetaArchivoEventoGeocerca } from 'app/shared/Models/trafico/conciliacion-caseta-archivo-evento-geocerca.model';
import { ConciliacionCasetaArchivoEvento } from 'app/shared/Models/trafico/conciliacion-caseta-archivo-evento.model';
import { ConciliacionCasetaArchivo } from 'app/shared/Models/trafico/conciliacion-caseta-archivo.model';
import { ConciliacionCaseta } from 'app/shared/Models/trafico/conciliacion-caseta.model';
import { AzureFileProperties } from 'app/shared/SearchModels/trafico/azureFileProperties_search.model';
import { BlobStorageService } from 'app/shared/Services/http/trafico/blob-storage.service';
import { ExcelService } from 'app/shared/Services/http/trafico/excel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';
import { ConciliacionCasetaArchivoModalComponent } from '../conciliacion-caseta-archivo-modal/conciliacion-caseta-archivo-modal.component';
import { ConciliacionCasetaService } from 'app/shared/Services/http/trafico/conciliacion-caseta.service';
import { ConciliacionCasetaArchivoService } from 'app/shared/Services/http/trafico/conciliacion-caseta-archivo.service';

@Component({
  selector: 'app-conciliacion-caseta-archivo',
  templateUrl: './conciliacion-caseta-archivo.component.html',
  styleUrls: ['./conciliacion-caseta-archivo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConciliacionCasetaArchivoComponent implements OnInit {

  modeloCaseta: ConciliacionCaseta = new ConciliacionCaseta();
  idCaseta: string;

  modeloArchivo: ConciliacionCasetaArchivo = new ConciliacionCasetaArchivo();
  idArchivo: string;
  
  modeloEvento: ConciliacionCasetaArchivoEvento = new ConciliacionCasetaArchivoEvento();
  idEvento: string;

  modeloGeocerca: ConciliacionCasetaArchivoEventoGeocerca = new ConciliacionCasetaArchivoEventoGeocerca();
  idGeocerca: string;

  global_formData: FormData = new FormData();
  global_fileToUpload: File | null = null;
  global_ArchivoPropiedades: AzureFileProperties = new AzureFileProperties();

  @Input() progress = 0;
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  
  dataString: any;
  fileName: any;

  importarModalDialogRef: MatDialogRef<ConciliacionCasetaArchivoModalComponent>;

  constructor(
    private _matDialog: MatDialog,
    private toastr : ToastrService,
    private ngxService: NgxUiLoaderService,
    public xls: ExcelService,
    private router: Router,
    private route: ActivatedRoute,
    private blobStorageService: BlobStorageService,
    private conciliacionCasetaService: ConciliacionCasetaService,
    private conciliacionCasetaArchivoService: ConciliacionCasetaArchivoService,
  ) { }

  ngOnInit(): void {
    // this.obtenerConciliacionCasetaId(this.idCaseta);
    this.iniciar();
  }

  iniciar(){
    this.route.params.subscribe(params => {
        this.idCaseta = params['id']; // (+) converts string 'id' to a number

    });
  }

  // obtenerConciliacionCasetaId(id: string) {
  //   this.conciliacionCasetaService.obtenerPorId(this.idArchivo).subscribe((res: ConciliacionCaseta) => {
  //     this.ngxService.stop();
  //     this.modeloCaseta = res;
  //     // this.modelo.nombreGeocerca;
  //   },
  //     error => {
  //       this.ngxService.stop();
  //       console.log(error);
  //     });
  // }

  importarExcelArchivo(ev: any) {
    console.log(ev.target.files[0]);
    this.global_formData = new FormData();
    this.global_fileToUpload = ev.target.files[0];
    this.global_formData.append("asset", ev.target.files[0], ev.target.files[0].name);
    this.global_ArchivoPropiedades.NombreArchivo = this.global_fileToUpload.name;
    this.global_ArchivoPropiedades.NombreOriginal = this.global_fileToUpload.name;
    this.global_ArchivoPropiedades.Extension = this.global_fileToUpload.name.split('.').pop();
    this.global_ArchivoPropiedades.Ruta = 'archivosiave';
    try{
      this.blobStorageService.importarArchivo(this.global_formData, this.global_ArchivoPropiedades).subscribe((respuesta:RespuestaBd)=>{

          this.modeloArchivo.excelArchivo = respuesta.mensaje;
          // this.descargarExcelArchivo(this.modeloArchivo.excelArchivo);
          this.toastr.success('Archivo subido correctamente');

      }, error => {

        this.toastr.error('No se subio el archivo correctamente');
      });
      this.ngxService.stop();
    } catch {
      this.toastr.error('No se subio el archivo correctamente');
    }
  }

  // descargarExcelArchivo(nombrerchivo: string){
  //   this.blobstorageService.descargarImagenTicket(nombrerchivo).subscribe((respuesta:RespuestaBd)=>{
  //      this.ticketFrente = respuesta.mensaje;
  //   });
  // }

  guardarConciliacionCasetaArchivo() {
    this.ngxService.start();
    if (this.modeloArchivo.id === 0) {
      // console.log(this.modeloArchivo.conciliacionCasetaId);

      this.modeloArchivo.conciliacionCasetaId = parseInt(this.idCaseta);
      this.conciliacionCasetaArchivoService.insertar(this.modeloArchivo).subscribe(
        (res: any) => {
          this.ngxService.stop();
          this.toastr.success('El archivo ha sido guardado correctamente.');
          this.modeloArchivo = res;
          this.idArchivo = this.modeloArchivo.id.toString();
        },
        error => {
          this.ngxService.stop();
          console.log(error);
          this.toastr.error('Error al guardar al archivo.');
        }
      )
    } else {
      this.conciliacionCasetaArchivoService.actualizar(this.modeloArchivo).subscribe(
        (res: any) => {
          this.ngxService.stop();
          this.toastr.success('Conciliación ha sido actualizado correctamente.');
          this.idArchivo = this.modeloArchivo.id.toString();
          window.location.reload();
        },
        error => {
          this.ngxService.stop();
          console.log(error);
          this.toastr.error('Error al actualizar Conciliación.');
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

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  fileClick(ev:any){
    ev.target.value = '';
  }

  onFileChange(ev) {
    this.importarExcelArchivo(ev);
    // this.prepareFilesList(ev.target.files);
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];

    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      console.log(jsonData);
      this.dataString = jsonData.archivoIavePuroSinModificaciones;
      console.log(this.dataString);
      
      // let array: Eventos = new Eventos();
      // for()
      // {
      //   array.ClaveRed = data[x].ClavedeRed;
      //   array.ClaveFideicomiso = data[x].ClavedeFideicomiso;
      //   array.NumeroPeriodo = data[x].Nodeperiodo;
      //   array.TipoPeriodo = data[x].Tipodeperiodo;
      //   array.ClaveEmpresa = data[x].Clavedeempresa;
      //   array.TarjetaIDMX = data[x].TarjetaIDMX;
      //   array.NumeroEconomico = data[x].Noeconomico;
      //   array.FechaCruce = data[x].Fechadecruce;
      //   array.HoraCruce = data[x].Horadecruce;
      //   array.Clase = data[x].Clase;
      //   array.NombreCaseta = data[x].Nombredecaseta;
      //   array.NombreCarril = data[x].Nombredecarril;
      //   array.ImporteAl100 = data[x].Importaal100;
      //   array.ImporteFacturado = data[x].Importefacturado;
      //   array.NumeroPlaza = data[x].numeroPlaza;
      //   array.ControlInternoProveedor1 = data[x].controlInternoProveedor1;
      //   array.ControlInternoProveedor2 = data[x].controlInternoProveedor2;
      //   array.ControlInternoProveedor3 = data[x].controlInternoProveedor3;
      //   array.ControlInternoProveedor4 = data[x].controlInternoProveedor4;
      //   array.NumeroCargaBanco = data[x].numeroCargoBanco;
      //   array.FechaCargoBanco = data[x].fechaCargoBanco;
         
      //   arr_obj.push(obj);      
      // }

    }
    reader.readAsBinaryString(file);

    this.prepareFilesList(ev.target.files);
    
  }

  // downloadFileModal(){
  //   let link = document.createElement("a");
  //   link.download = "filename";
  //   link.href = "assets/images/user-image.png";
  //   link.click();
  // }

  // regresarCancelar(){
  //   this.dialogRef.close(null);
  // }
}