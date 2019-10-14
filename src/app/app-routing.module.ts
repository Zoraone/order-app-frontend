import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderComponent } from './order/order.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  { path: 'order/:id', component: OrderComponent },
  { path: 'store/:id', component: StoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
