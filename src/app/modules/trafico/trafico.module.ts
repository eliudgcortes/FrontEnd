import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConciliacionCasetaArchivoComponent } from './conciliacion-caseta-archivo/conciliacion-caseta-archivo.component';
import { IConfig } from 'ngx-mask';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TraficoRoute } from './trafico.routing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { SharedModule } from "app/shared/shared.module";
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { NgxMaskModule } from 'ngx-mask';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FuseConfigModule } from "@fuse/services/config";
import { ToastContainerModule, ToastrModule } from "ngx-toastr";
import { NgxCurrencyModule } from "ngx-currency";
import { ConciliacionCasetaComponent } from './conciliacion-caseta/conciliacion-caseta.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ConciliacionCasetaArchivoEventoGeocercaComponent } from './conciliacion-caseta-archivo-evento-geocerca/conciliacion-caseta-archivo-evento-geocerca.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConciliacionCasetaArchivoModalComponent } from './conciliacion-caseta-archivo-modal/conciliacion-caseta-archivo-modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule} from '@angular/material/list';
import { ConciliacionCasetaAbcComponent } from './conciliacion-caseta-abc/conciliacion-caseta-abc.component';
import { ConciliacionCasetaArchivoEventoComponent } from './conciliacion-caseta-archivo-evento/conciliacion-caseta-archivo-evento.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    ConciliacionCasetaArchivoComponent,
    ConciliacionCasetaArchivoEventoComponent,
    ConciliacionCasetaComponent,
    ConciliacionCasetaArchivoEventoGeocercaComponent,
    InicioComponent,
    ConciliacionCasetaArchivoModalComponent,
    ConciliacionCasetaAbcComponent,
  ],
  imports: [
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatMenuModule,
    SharedModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    NgxMaskModule,
    MatPaginatorModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    HttpClientModule,
    MatAutocompleteModule,
    FuseConfigModule,
    ToastContainerModule,
    ToastrModule,
    NgxCurrencyModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(TraficoRoute),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class TraficoModule { }
