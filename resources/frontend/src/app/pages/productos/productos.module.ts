import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { GaleriaComponent } from './galeria/galeria.component';

 
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductosComponent,
    GaleriaComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule
  ]
})
export class ProductosModule { }
