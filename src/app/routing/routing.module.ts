import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FridgeComponent } from '../fridge/fridge.component';
import { FridgeFormComponent } from '../fridge-form/fridge-form.component';
import { GroceryComponent } from '../grocery/grocery.component';
import { GroceryFormComponent } from '../grocery-form/grocery-form.component';
 

 
const routes: Routes = [
  { path: '', redirectTo: '/fridge', pathMatch: 'full' },

  { path: 'fridge', component: FridgeComponent },
  { path: 'fridge/edit/:id', component: FridgeFormComponent },
  { path: 'fridge/add', component: FridgeFormComponent },

  { path: 'grocery', component: GroceryComponent },
  { path: 'grocery/edit/:id', component: GroceryFormComponent },
  { path: 'grocery/add', component: GroceryFormComponent },


]
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}