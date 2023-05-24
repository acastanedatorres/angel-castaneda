import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/productos', pathMatch: 'full'
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'productos', loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
