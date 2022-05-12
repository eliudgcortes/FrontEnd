export class ConciliacionCasetaArchivoEvento {
    id: number = 0;
    nombre: string = "";
    conciliacionCasetaArchivo: ConciliacionCasetaArchivo = new ConciliacionCasetaArchivo();
    conciliacionCasetaArchivoId: number = 0;
    descripcion: string = "";
    claveRed: number = 0;
    claveFideicomiso: number = 0;
    numeroPeriodo: number = 0;
    tipoPeriodo: string = "";
    claveEmpresa: string = "";
    tarjetaIDMX: string = "";
    numeroEconomico: string = "";
    fechaCruce: string = "0001-01-01";
    horaCruce: string = "00:00";
    clase: number = 0;
    nombreCaseta: string = "";
    nombreCarril: string = "";
    importeAl100: number = 0;
    importeFacturado: number = 0;
    numeroPlaza: number = 0;
    controlInternoProveedor1: string = "";
    controlInternoProveedor2: string = "";
    controlInternoProveedor3: string = "";
    controlInternoProveedor4: string = "";
    numeroCargaBanco: number = 0;
    fechaCargoBanco: string = "0001-01-01";
    estatusCruce: string = "";
    bActivo: boolean = true;

    constructor(){}
}

export class ConciliacionCasetaArchivo {
    id: number = 0;
    nombre: string = "";
    descripcion: string = "";
    fechaAlta: string = "0001-01-01";

    constructor(){}
}