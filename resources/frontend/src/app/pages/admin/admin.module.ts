import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductosComponent } from './productos/productos.component';
import { FormProductosComponent } from './productos/form-productos/form-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleProductosComponent } from './productos/detalle-productos/detalle-productos.component';

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AdminComponent,
    ProductosComponent,
    FormProductosComponent,
    DetalleProductosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgChartsModule,
    FormsModule
  ]
})
export class AdminModule { }
