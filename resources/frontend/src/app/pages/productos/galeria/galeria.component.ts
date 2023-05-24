import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent {

  productos: any = [];

  filters = {
    idioma : "español",
    direction : "asc",
    order_by : "nombre",
    name : "",
    sku: ""
  }

  constructor(private router: Router, private productService : ProductsService) {
    this.productService.getProducts(this.filters).subscribe(res=> {
      this.productos = res;
    })
  }



  handleDetails(id: number) {
    this.router.navigate(['productos', id])
  }
}
