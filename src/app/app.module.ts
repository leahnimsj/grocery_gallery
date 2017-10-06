import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingComponent } from './routing/routing.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { FridgeComponent } from './fridge/fridge.component';
import { FridgeFormComponent } from './fridge-form/fridge-form.component';
import { GroceryComponent } from './grocery/grocery.component';
import { GroceryFormComponent } from './grocery-form/grocery-form.component';
import { TrashComponent } from './trash/trash.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    NavigationComponent,
    StatusMessageComponent,
    FridgeComponent,
    FridgeFormComponent,
    GroceryComponent,
    GroceryFormComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
