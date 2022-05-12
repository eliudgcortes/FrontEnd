import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CatalogosRoute } from './catalogos.routing';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { SharedModule } from "app/shared/shared.module";
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ListagenericaComponent } from './listagenerica/listagenerica.component';
import { ListagenericaAbcComponent } from './listagenerica-abc/listagenerica-abc.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { ListaGenericaTipoComponent } from "./lista-generica-tipo/lista-generica-tipo.component";
import { ListaGenericaTipoAbcComponent } from "./lista-generica-tipo-abc/lista-generica-tipo-abc.component";
import { ListaGenericaTipoAbcModalComponent } from './lista-generica-tipo-abc-modal/lista-generica-tipo-abc-modal.component';
import { CasetaAbcComponent } from "./caseta-abc/caseta-abc.component";
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { CarrilModalComponent } from "./carril-modal/carril-modal.component";
import { CasetasComponent } from "./casetas/casetas.component";
import { HttpClientModule } from '@angular/common/http';


import { AzureMapsModule } from 'ng-azure-maps';
import { environment } from "environments/environment";
// import atlas from "azure-maps-control";
import * as atlas from 'azure-maps-control';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { appConfig } from "app/core/config/app.config";
import { FuseConfigModule } from "@fuse/services/config";
import { CasetaAbcModalComponent } from "./caseta-abc-modal/caseta-abc-modal.component";
import { CampoTicketModalComponent } from './campo-ticket-modal/campo-ticket-modal.component';
import { GeocercasComponent } from './geocercas/geocercas.component';
import { GeocercaAbcComponent } from './geocerca-abc/geocerca-abc.component';
import { ToastContainerModule, ToastrModule } from "ngx-toastr";
import { NgxCurrencyModule } from "ngx-currency";

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
  CasetaAbcComponent,
  CasetasComponent,
  ListagenericaComponent,
  ListagenericaAbcComponent,
  ListaGenericaTipoComponent,
  ListaGenericaTipoAbcComponent,
  ListaGenericaTipoAbcModalComponent,
  CarrilModalComponent,
  CasetaAbcModalComponent,
  CampoTicketModalComponent,
  GeocercasComponent,
  GeocercaAbcComponent
],
  imports: [
      MatFormFieldModule,
      MatAutocompleteModule,
      FuseConfigModule.forRoot(appConfig),
      RouterModule.forChild(CatalogosRoute),
      MatDialogModule,
      MatIconModule,
      MatExpansionModule,
      HttpClientModule,
      MatChipsModule,
      SharedModule,
      FormsModule,
      MatIconModule,
      MatExpansionModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDialogModule,
      MatDividerModule,
      MatTableModule,
      MatMenuModule,
      MatSortModule,
      // ToastrModule,
      // ToastContainerModule,
      MatCheckboxModule,
      NgxCurrencyModule,
      NgxMaskModule.forRoot(maskConfig),

      AzureMapsModule.forChild({
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: 'SoT90s7fwMCiJLwjJDKbHYQFRS7MJ0xh7AWD-nvvoGA'
      }
      }),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class CatalogosModule { }
