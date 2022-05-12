import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConciliacionCasetaArchivoEvento } from 'app/shared/Models/trafico/conciliacion-caseta-archivo-evento.model';
import { ExcelService } from 'app/shared/Services/http/trafico/excel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-conciliacion-caseta-archivo-evento',
  templateUrl: './conciliacion-caseta-archivo-evento.component.html',
  styleUrls: ['./conciliacion-caseta-archivo-evento.component.scss']
})
export class ConciliacionCasetaArchivoEventoComponent implements OnInit {

  modeloEvento: ConciliacionCasetaArchivoEvento = new ConciliacionCasetaArchivoEvento();
  id: string;

  constructor(
    private toastr : ToastrService,
    private ngxService: NgxUiLoaderService,
    public xls: ExcelService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
  }

  

}