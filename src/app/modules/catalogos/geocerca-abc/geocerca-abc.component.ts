import { Component, OnInit } from '@angular/core';
import { Geocerca } from 'app/shared/Models/catalogos/geocerca.model';
import { GeocercaService } from 'app/shared/Services/http/catalogos/geocerca.service';
import { SearchService } from 'ng-azure-maps';
import * as atlasr from 'azure-maps-rest';

@Component({
  selector: 'app-geocerca-abc',
  templateUrl: './geocerca-abc.component.html',
  styleUrls: ['./geocerca-abc.component.scss']
})
export class GeocercaAbcComponent implements OnInit {

  constructor(
      private geocercaService: GeocercaService,
      private searchService: SearchService,
    ) { }

  ngOnInit(): void {
      this.obtenerGeocercas();
  }


  geocercas : Geocerca[]=[];

  obtenerGeocercas(){
    this.geocercaService.obtenerGeocercasSinDireccion().subscribe((res:Geocerca[])=>{
        console.log(res)
      this.geocercas = res;
        for(let x in this.geocercas){
          this.searchService.searchAddressReverse([this.geocercas[x].punto.latitud,this.geocercas[x].punto.longitud]).subscribe((resultados : atlasr.Models.SearchAddressReverseResponse)=> {
            this.geocercas[x].descripcion = resultados.addresses[0].address.freeformAddress;
            console.log(resultados.addresses[0].address.freeformAddress)
          },
            error => {console.log(error);
          });
        }
      })
  }

  actualizarGeocercas(){
    this.geocercaService.actualizarDescripciones(this.geocercas).subscribe((resultado:any)=>{
      console.log('Ya quedo')
      this.obtenerGeocercas();
    })
  }


}
