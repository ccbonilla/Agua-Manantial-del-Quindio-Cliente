import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { OrdersComponent } from './views/orders/orders.component';
import { NavBarComponent } from './views/nav-bar/nav-bar.component';
import { QuienesSomosComponent } from './views/quienes-somos/quienes-somos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { HistorialClienteComponent } from './views/historial-cliente/historial-cliente.component';
import { CarritoComponent } from './views/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    NavBarComponent,
    QuienesSomosComponent,
    HomeComponent,
    HistorialClienteComponent,
    CarritoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule,BrowserAnimationsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
