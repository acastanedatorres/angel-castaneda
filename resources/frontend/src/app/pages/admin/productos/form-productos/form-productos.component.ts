import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss']
})
export class FormProductosComponent {

  @ViewChild('input') input!: ElementRef;

  public formGroup!: FormGroup;

  ngAfterViewInit() {
    // server-side search
  fromEvent(this.input.nativeElement,'keyup')
      .pipe(
          filter(Boolean),
          debounceTime(500),
          distinctUntilChanged(),
          tap((text) => {
            console.log(this.input.nativeElement.value)
          })
      )
      .subscribe();
  }

  constructor(public router : Router, private formBuilder: FormBuilder ) {
    this.buildForm()
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
      activo:['', [Validators.required]],
      esp_nombre:['', [Validators.required]],
      esp_descripcion_corta: ['', [Validators.required]],
      esp_descripcion_larga: new FormControl(),
      esp_idioma: ['', [Validators.required]],
      en_nombre: ['', [Validators.required]],
      en_descripcion_corta: ['', [Validators.required]],
      en_descripcion_larga: new FormControl(),
      en_idioma: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
    }
    else{
      alert("FILL ALL FIELDS")
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.formGroup.controls[control].hasError(error);
  }
}
