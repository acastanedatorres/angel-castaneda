import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.scss']
})
export class DetalleProductosComponent {
  tipoCambio = {};
  constructor(private productService: ProductsService) {
    this.productService.getTipoDeCambio().subscribe(res=> {
      console.log(res);
      this.tipoCambio = res;
    })
  }
}
