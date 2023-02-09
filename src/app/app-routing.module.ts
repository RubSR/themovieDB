import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {PeliculaDetalleComponent} from "./pages/pelicula-detalle/pelicula-detalle.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'detalle', component: PeliculaDetalleComponent},
  { path: '', redirectTo : '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
