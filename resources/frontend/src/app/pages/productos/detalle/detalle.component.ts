import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  producto : any = null;

  items!: MenuItem[];

  home!: MenuItem;
  

  constructor(private productService : ProductsService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.items = [
      { label: 'productos' , routerLink: '/productos'},
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/productos' };

    this.route.params.subscribe(params => {
      this.productService.getById(params['id']).subscribe(res=> {
        this.producto = res;
      })
    })
  }
}
