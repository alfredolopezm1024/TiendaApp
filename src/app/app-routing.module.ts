import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { TiendaArticuloComponent } from './pages/tienda-articulo/tienda-articulo.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ArticuloTiendaComponent } from './pages/articulo-tienda/articulo-tienda.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'tienda', component: TiendaComponent, canActivate: [AuthGuard] },
  { path: 'tienda/:id/articulos', component: TiendaArticuloComponent, canActivate: [AuthGuard] },
  { path: 'articulo', component: ArticuloComponent, canActivate: [AuthGuard] },
  { path: 'articulo/:id/tiendas', component: ArticuloTiendaComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
