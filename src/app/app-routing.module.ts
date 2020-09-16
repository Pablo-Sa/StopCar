import { ListCarsComponent } from './components/list-cars/list-cars.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterCarsComponent } from './components/register-cars/register-cars.component';
import { OrderServiceComponent } from './components/order-service/order-service.component';
import { EstimateComponent } from './components/estimate/estimate.component';
import { LogCarsComponent } from './components/log-cars/log-cars.component';
import { LogOrderComponent } from './components/log-order/log-order.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';


const routes: Routes = [
  { path: 'clientes', component: RegisterClientComponent },
  { path: 'veiculos', component: RegisterCarsComponent },
  { path: 'ordem', component: OrderServiceComponent },
  { path: 'orcamento', component: EstimateComponent },
  { path: 'historicoveiculo', component: LogCarsComponent },
  { path: 'exclusaoorcamento', component: LogOrderComponent },
  { path: 'consultaclientes', component: ListClientsComponent },
  { path: 'consultaveiculos', component: ListCarsComponent },
  { path: '', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
