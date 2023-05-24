import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss']
})
export class FormProductosComponent implements OnInit{

  @ViewChild('input') input!: ElementRef;

  edit : boolean = false;
  id : number = 0;

  public formGroup!: FormGroup;
  tipoCambio = 0;

  ngAfterViewInit() {
    // server-side search
  fromEvent(this.input.nativeElement,'keyup')
      .pipe(
          filter(Boolean),
          debounceTime(500),
          distinctUntilChanged(),
          tap((text: any) => {
            console.log(text);
            const pesos = Math.round(this.tipoCambio * this.input.nativeElement.value);
            this.formGroup.patchValue({precio_pesos : pesos})
            console.log(pesos)
          })
      )
      .subscribe();
  }

  constructor(
    private productService : ProductsService,
    public  router         : Router,
    private formBuilder    : FormBuilder,
    private route          : ActivatedRoute ) {
    this.buildForm()
    this.productService.getTipoDeCambio().subscribe(res => {
      this.tipoCambio = res.bmx.series[0].datos[0].dato;
    })
  }
  ngOnInit(): void {
    this.route.params.subscribe(res => {
      if(res['id']) {
        this.id = res['id'];
        this.edit = true;
        this.productService.getProductById(res['id']).subscribe(res => {
          console.log(res);
          const formData = {
            sku:   res.sku,
            precio_dolares: res.precio_dolares,
            precio_pesos:res.precio_pesos,
            puntos:res.puntos,
            esp_id : res.traducciones[0].id,
            esp_nombre:res.traducciones[0].nombre,
            esp_descripcion_corta: res.traducciones[0].descripcion_corta,
            esp_descripcion_larga: res.traducciones[0].descripcion_larga,
            en_id : res.traducciones[1].id,
            en_nombre: res.traducciones[1].nombre,
            en_descripcion_corta: res.traducciones[1].descripcion_corta,
            en_descripcion_larga: res.traducciones[1].descripcion_larga,
          }
          this.formGroup.patchValue(formData);
        })
      }
    })
  }

  handleCancel() {
    this.router.navigateByUrl("/admin/productos");
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      sku:  ['', [Validators.required]],
      precio_dolares: ['', [Validators.required]],
      precio_pesos:['', [Validators.required]],
      puntos:['', [Validators.required]],
      esp_id : [],
      esp_nombre:['', [Validators.required]],
      esp_descripcion_corta: ['', [Validators.required]],
      esp_descripcion_larga: new FormControl(),
      en_id : [],
      en_nombre: ['', [Validators.required]],
      en_descripcion_corta: ['', [Validators.required]],
      en_descripcion_larga: new FormControl(),
    });
  }

  submit() {
    if (this.formGroup.valid) {
      const values = this.formGroup.value

      const sendData = {
        sku : values.sku,
        precio_dolares : values.precio_dolares,
        precio_pesos   : values.precio_pesos,
        puntos         : values.puntos,
        traducciones : [
          {
              id : values.esp_id,
              nombre : values.esp_nombre,
              descripcion_corta : values.esp_descripcion_corta,
              descripcion_larga : values.esp_descripcion_larga,
              idioma : "español"
          },
            {
              id : values.en_id,
              nombre : values.en_nombre,
              descripcion_corta : values.en_descripcion_corta,
              descripcion_larga : values.en_descripcion_larga,
              idioma : "ingles"
          }
        ]
      }

      if(this.edit) {
        this.productService.update(sendData, this.id).subscribe(res=> {
          Swal.fire("Edicion correcta", "Producto agregado", "success").then(() => {
            this.router.navigateByUrl("/admin/productos")
          })
        })
      } else {
        this.productService.create(sendData).subscribe(res=> {
          Swal.fire("Registro correcto", "Producto agregado", "success").then(() => {
            this.router.navigateByUrl("/admin/productos")
          })
        })
      }
    }
    else{
      Swal.fire("Datos incompletos", "Completa todos los datos", "warning");
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.formGroup.controls[control].hasError(error);
  }
}
