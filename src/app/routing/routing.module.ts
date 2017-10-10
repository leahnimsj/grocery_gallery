import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FridgeComponent } from '../fridge/fridge.component';
import { FridgeFormComponent } from '../fridge-form/fridge-form.component';
 

 
const routes: Routes = [
  { path: '', redirectTo: '/fridge', pathMatch: 'full' },

  { path: 'fridge', component: FridgeComponent },
  { path: 'fridge/edit/:id', component: FridgeFormComponent },
  { path: 'fridge/add', component: FridgeFormComponent }

]
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}