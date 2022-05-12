import { Carril } from "./carril.model";
import { Caseta } from "./caseta.model";
import { ListaGenerica } from "./listagenerica.model";

export class Geocerca {
    id: number = 0;
    nombre: string = "";
    descripcion: string = "";
    poligono: PoligonoModel = new PoligonoModel();
    poligonoComputado: string = "";
    punto: PuntoModel = new PuntoModel();
    puntoComputado: string = "";
    geocercaIdExterno: string = "";
    tipoGeocerca: ListaGenerica = new ListaGenerica();
    tipoGeocercaId: number | null = 0;
    bActivo: boolean = true;
    fechaAlta: string = "0001-01-01";
    fechaEdita: string = "0001-01-01";
    fechaElimina: string = "0001-01-01";
    casetas: Caseta[] = [];
    carriles: Carril[] = [];

    constructor(){}
}

export class PuntoModel {
    latitud: number = 0;
    longitud: number = 0;

    constructor(){}
}

export class PoligonoModel {
    tipo: string = " ";
    puntos: PuntoModel[] = [];

    constructor(){}
}
