import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }


  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }
  
  public exportAsExcelResultFile(data: any[],actions: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(actions);
    const workbook: XLSX.WorkBook = { Sheets: { 'Data': worksheet , 'Actions' : worksheet2 }, SheetNames: ['Data','Actions'] };
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }

  public exportAsExcelResultFileControls(procesados: any[],sinProcesar: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(procesados);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sinProcesar);
    const workbook: XLSX.WorkBook = { Sheets: { 'Procesados': worksheet , 'SinProcesar' : worksheet2 }, SheetNames: ['Procesados','SinProcesar'] };
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }

  public exportAsExcelFileWithTitle(json: any[],json2: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(json);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(json2);
    const workbook: XLSX.WorkBook = { Sheets: { 'Deficiency comments': worksheet , 'Actions comments' : worksheet2 }, SheetNames: ['Deficiency comments', 'Actions comments'] };

    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }

  public exportAsExcelFileArray(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }
}
