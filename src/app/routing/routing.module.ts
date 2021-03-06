import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FridgeComponent } from '../fridge/fridge.component';
import { FridgeFormComponent } from '../fridge-form/fridge-form.component';
import { GroceryComponent } from '../grocery/grocery.component';
import { GroceryFormComponent } from '../grocery-form/grocery-form.component';
import { TrashComponent } from '../trash/trash.component';

import { HomePageComponent } from '../home-page/home-page.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { FridgeSearchComponent } from '../fridge-search/fridge-search.component';

 

 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'fridge', component: FridgeComponent },
  { path: 'fridge/edit/:id', component: FridgeFormComponent },
  { path: 'fridge/add', component: FridgeFormComponent },
  { path: 'fridge/search', component: FridgeSearchComponent },
  { path: 'fridge/addsearch/:id', component: FridgeFormComponent },
  { path: 'fridge/search/:name', component: FridgeSearchComponent },

  { path: 'grocery', component: GroceryComponent },
  { path: 'grocery/edit/:id', component: GroceryFormComponent },
  { path: 'grocery/add', component: GroceryFormComponent },

  { path: 'trash', component: TrashComponent },

  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent }


]
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}