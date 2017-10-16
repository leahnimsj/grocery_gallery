import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { MatDialogModule } from '@angular/material';
import {MatIconModule, MatIconRegistry } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import { ManageFridgeComponent } from './manage-fridge/manage-fridge.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SessionDataService } from './session-data.service';
import { EmailService } from './email.service';
import { GroceryEmailFormComponent } from './grocery-email-form/grocery-email-form.component'; //added email service




@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StatusMessageComponent,
    FridgeComponent,
    FridgeFormComponent,
    GroceryComponent,
    GroceryFormComponent,
    TrashComponent,
    ManageFridgeComponent,
    HomePageComponent,
    LoginComponent,
    SignUpComponent,
    GroceryEmailFormComponent
  

  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule


  ],

  entryComponents: [
    ManageFridgeComponent, GroceryEmailFormComponent
  ],


  providers: [
    DataService,
    MatIconRegistry,
    SessionDataService,
    EmailService,
    GroceryEmailFormComponent
   ],
  bootstrap: [AppComponent]

})


export class AppModule { }



