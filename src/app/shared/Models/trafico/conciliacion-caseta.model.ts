import { ConciliacionCasetaArchivo } from "./conciliacion-caseta-archivo.model";

export class ConciliacionCaseta {
    id: number = 0;
    claveRed: number = 0;
    empresa: string = "";
    empresaId: number = 0;
    fechaAlta: string = "";
    fechaEdita: string = "";
    fechaElimina: string = "";
    usuarioAlta: string = "";
    usuarioEdita: string = "";
    usuarioElimina: string = "";
    fechaInicio: string = "";
    fechaFin: string = "";
    bActivo: boolean = true;
    archivos: ConciliacionCasetaArchivo[] = [];

    constructor(){}
}