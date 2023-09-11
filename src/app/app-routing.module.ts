import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { OrdersComponent } from './views/orders/orders.component';
import { HomeComponent } from './views/home/home.component';
import { QuienesSomosComponent } from './views/quienes-somos/quienes-somos.component';
import { HistorialClienteComponent } from './views/historial-cliente/historial-cliente.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'quienessomos', component: QuienesSomosComponent },
  { path: 'historialcliente', component: HistorialClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
