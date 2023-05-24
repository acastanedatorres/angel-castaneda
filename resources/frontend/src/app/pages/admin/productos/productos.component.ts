import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

 

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit{
  constructor(private router:Router, private productService : ProductsService) {
   this.getProducts();
  }

  getProducts() {
    this.productService.get().subscribe(res=> {
      this.products = res;
    })
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'inventoryStatus', header: 'Status' },
      { field: 'rating', header: 'Rating' }
    ];
  }
  products = [];

  cols: any[] = [];

  handleNewProduct(){
    this.router.navigateByUrl("admin/producto/nuevo")
  }

  handleEdit(id: number) {
    this.router.navigate(["admin/producto/editar", id])
  }

  handleDetails(id: number) {
    this.router.navigate(["admin/producto/", id]);
  }

  handleDelete(id: number) {
    Swal.fire({
      title: '¿Confirma que desea eliminar el producto?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe(res=> {
          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado',
            'success'
          )
          this.getProducts();
        })
      }
    })
  }

  activo(status: number) {
    return status == 1 ? true : false
  }
}
