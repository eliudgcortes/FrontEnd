import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ListaGenericaSearchModel } from 'app/shared/SearchModels/catalogos/listagenerica_search.model';
import { ListaGenerica } from 'app/shared/Models/catalogos/listagenerica.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ListaGenericaService } from 'app/shared/Services/http/catalogos/listagenerica.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaGenericaTipoService } from 'app/shared/Services/http/catalogos/lista-generica-tipo.service';
import { FuseAlertType } from '@fuse/components/alert';
import { ListagenericaAbcComponent } from '../listagenerica-abc/listagenerica-abc.component';
import { ListaGenericaTipo } from 'app/shared/Models/catalogos/listagenericatipo.model';
import { FormBuilder } from '@angular/forms';
import { ListaGenericaTipoSearchModel } from 'app/shared/SearchModels/catalogos/listagenericatipo_search.model';
import { ListaGenericaTipoAbcComponent } from '../lista-generica-tipo-abc/lista-generica-tipo-abc.component';

@Component({
    selector: 'app-listagenerica',
    templateUrl: './listagenerica.component.html',
    styleUrls: ['./listagenerica.component.scss']
})
export class ListagenericaComponent implements OnInit {


    sm: ListaGenericaSearchModel = new ListaGenericaSearchModel();
    sm2: ListaGenericaTipoSearchModel = new ListaGenericaTipoSearchModel();
    listas: ListaGenericaTipo[] = [];
    resultados: ListaGenerica[] = [];


    columnas: any[] = ['NombreListaGenerica', 'descripcionListaGenerica', 'valorString', "valorEntero", "valorFlotante", "accion"];
    filtrarColumnas: string[] = ['NombreListaGenerica', 'descripcionListaGenerica', 'valorString', "valorEntero", "valorFlotante"];

    modelo: ListaGenerica = new ListaGenerica();
    id: string;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    showAlert: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource = new MatTableDataSource<any>();
    cuentaDialogRef: MatDialogRef<ListagenericaComponent>;
    ListaGenericaDialogRef: MatDialogRef<ListagenericaAbcComponent>;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private ngxService: NgxUiLoaderService,
        private listaGenericaService: ListaGenericaService,
        private listaGenericaTipoService: ListaGenericaTipoService,
        private router: Router,
        private datasc: ListaGenericaService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,

    ) { }

    ngOnInit(): void {
        this.obtenerListaTipo();
    }

    aplicarDatosTabla(res: any) {
        this.paginator._intl.itemsPerPageLabel = 'elementos por página';
        this.paginator.pageSize = 10;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = res;
        this.changeDetectorRef.detectChanges();
    }

    ObtenerDeListagenericas() {
        this.listaGenericaService.obtenerlista(this.sm).subscribe((res: ListaGenerica[]) => {
            console.log(res)
        }, error => {
            console.log(error);
        });
    }
    filtrarDatos(str_Filtro: string, filterCols: string[]): any {
        let datosFiltrados;
        if (str_Filtro != "") {
            datosFiltrados = this.resultados.filter(x =>
                filterCols.some(col => x[col].toLocaleLowerCase().trim().includes(str_Filtro))
            );
        } else {
            datosFiltrados = this.resultados
        }
        return datosFiltrados
    }

    aplicarFiltro(str_Filtro: string) {
        this.aplicarDatosTabla(this.filtrarDatos(str_Filtro, this.filtrarColumnas))
    }

    obtenerLista() {
        this.listaGenericaService.obtenerlista(this.sm).subscribe((res: ListaGenerica[]) => {
            this.resultados = res;
            this.aplicarDatosTabla(res);

        }, error => {
            console.log(error);
        });
    }

    obtenerListaTipo() {

        this.listaGenericaTipoService.obtenerLista(this.sm2).subscribe((res: ListaGenericaTipo[]) => {
            this.listas = res;
            this.sm.listaGenericaTipoId = res[0].id
            this.obtenerLista()
        }, error => {
            console.log(error);
        });
    }

    eliminarListaGenerica(idListaGenerica: number) {
        this.ListaGenericaDialogRef = this._matDialog.open(ListagenericaAbcComponent, {
            disableClose: false,
            data: {
                id: idListaGenerica,
                listaGenericaId: this.id
            },
            width: "40%",
            height: "auto"
        });

        this.ListaGenericaDialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                // this.obtenerCuentasCliente(parseInt(this.id));
                this.mensajeExito();
            }

            this.ListaGenericaDialogRef = null;
        });
    }

    eliminar(element: ListaGenerica): void {
        this.listaGenericaService
            .eliminar(`${element.id}`)
            .subscribe(
                (res: any) => {
                    this.ngxService.stop();
                    this.mensajeExito();

                },
                error => {
                    this.ngxService.stop();
                    console.log(error);
                    this.mensajeError();
                }
            )
    }

    onSubmit() {
        alert(JSON.stringify(this.sm2.nombre))
    }

    mensajeExito() {
        this.showAlert = false;
        // Set the alert
        this.alert = {
            type: 'success',
            message: 'Se completo la acción'
        };

        // Show the alert
        this.showAlert = true;

        setTimeout(() => {
            this.showAlert = false
        }, 5000)
    }

    mensajeError() {
        this.showAlert = false;
        // Set the alert
        this.alert = {
            type: 'error',
            message: 'No se completo la acción'
        };

        // Show the alert
        this.showAlert = true;

        setTimeout(() => {
            this.showAlert = false
        }, 5000)
    }


}
