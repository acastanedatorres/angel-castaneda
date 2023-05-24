import { RouterModule, Routes } from "@angular/router";
import { NgModule }             from "@angular/core";
import { ProductosComponent } from "./productos.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { GaleriaComponent } from "./galeria/galeria.component";


const routes: Routes = [
    { 
        path : '',
        component: ProductosComponent,
        children : [
            { path : '', component: GaleriaComponent },
            { path : ':id', component: DetalleComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductosRoutingModule {

}
