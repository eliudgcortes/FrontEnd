import { Peaje } from "./peaje.model";

export class Carril {

    id: number = 0;
    nombre: string = "";
    descripcion: string = "";
    aliasIave: string = "";
    bActivo: boolean = true;
    peajes: Peaje[] = [];
    casetaId: number = 0;
    bEditable: boolean = true;
    bNuevoCampo: boolean = true;

    constructor(){}
}