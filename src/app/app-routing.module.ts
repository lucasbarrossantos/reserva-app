import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  // Categorias
  { path: 'categorias', loadChildren: './categoria/categoria.module#CategoriaModule' },

  // Empresas
  { path: 'empresas', loadChildren: './empresa/empresa.module#EmpresaModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
