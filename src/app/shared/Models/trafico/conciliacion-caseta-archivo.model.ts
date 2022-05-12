import { ConciliacionCasetaArchivoEvento } from "./conciliacion-caseta-archivo-evento.model";

export class ConciliacionCasetaArchivo {
    id: number = 0;
    nombre: string = "";
    conciliacionCaseta: string = "";
    conciliacionCasetaId: number = 0;
    descripcion: string = "";
    fechaAlta: string = "";
    fechaInicio: string = "";
    fechaFin: string = "";
    estatusArchivo: string = "";
    excelArchivo: string = "";
    url: string = "";
    extension: string = "";
    bActivo: boolean = true;
    eventos: ConciliacionCasetaArchivoEvento[] = [];
    
    constructor(){}
}