import { RouterModule, Routes } from "@angular/router";
import { NgModule }             from "@angular/core";
import { AdminComponent } from "./admin.component";
import { ProductosComponent } from "./productos/productos.component";
import { FormProductosComponent } from "./productos/form-productos/form-productos.component";
import { DetalleProductosComponent } from "./productos/detalle-productos/detalle-productos.component";


const routes: Routes = [
    { 
        path : '',
        component: AdminComponent,
        children : [
            { path : 'productos',           component: ProductosComponent },
            { path : 'producto/nuevo',      component: FormProductosComponent },
            { path : 'producto/editar/:id', component: FormProductosComponent },
            { path : 'producto/:id',        component: DetalleProductosComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {

}
