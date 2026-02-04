import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CustomTableComponent } from './components/shared/custom-table/custom-table.component';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from './components/shared/modal-confirm/modal-confirm.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { TiendaArticuloComponent } from './pages/tienda-articulo/tienda-articulo.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ArticuloTiendaComponent } from './pages/articulo-tienda/articulo-tienda.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TiendaComponent,
    CustomTableComponent,
    ModalConfirmComponent,
    ClienteComponent,
    TiendaArticuloComponent,
    ArticuloComponent,
    ArticuloTiendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
