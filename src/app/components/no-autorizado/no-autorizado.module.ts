import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAutorizadoComponent } from './no-autorizado.component';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoAutorizadoRoute } from './no-autorizado.routing';



@NgModule({
  declarations: [NoAutorizadoComponent],
  imports: [
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule.forChild(NoAutorizadoRoute)
  ]
})
export class NoAutorizadoModule { }
