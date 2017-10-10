import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { FridgeComponent } from './fridge/fridge.component';
import { FridgeFormComponent } from './fridge-form/fridge-form.component';
import { GroceryComponent } from './grocery/grocery.component';
import { GroceryFormComponent } from './grocery-form/grocery-form.component';
import { TrashComponent } from './trash/trash.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StatusMessageComponent,
    FridgeComponent,
    FridgeFormComponent,
    GroceryComponent,
    GroceryFormComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
