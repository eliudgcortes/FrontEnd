import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConciliacionCasetaArchivo } from 'app/shared/Models/trafico/conciliacion-caseta-archivo-evento.model';
import { ExcelService } from 'app/shared/Services/http/trafico/excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-conciliacion-caseta-archivo-modal',
  templateUrl: './conciliacion-caseta-archivo-modal.component.html',
  styleUrls: ['./conciliacion-caseta-archivo-modal.component.scss']
})
export class ConciliacionCasetaArchivoModalComponent implements OnInit {
  
  @Input() progress = 0;

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  modeloArchivo: ConciliacionCasetaArchivo = new ConciliacionCasetaArchivo();
  id: string;

  dataString: any;
  fileName: any;

  constructor(
    private dialogRef: MatDialogRef<ConciliacionCasetaArchivoModalComponent>,
  ) { }

  ngOnInit(): void {

  }

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
      this.dataString = jsonData.archivoIaveFormatoExcel;
      console.log(this.dataString);
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

  regresarCancelar(){
    this.dialogRef.close(null);
  }
}
