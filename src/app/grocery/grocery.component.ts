import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EmailService } from '../email.service';



//modal
import { GroceryEmailFormComponent} from '../grocery-email-form/grocery-email-form.component';
import { MatDialogModule } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';


import {MatIconModule, MatIconRegistry } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  groceryItems: any[];



  constructor (private dataService: DataService, private emailservice:EmailService, public dialog: MatDialog) {}

  ngOnInit() {
    this.displayGroceryItems(); 
  }

  displayGroceryItems() {
    this.dataService.getRecords("grocery")
      .subscribe(
        groceryItems => this.groceryItems = groceryItems,
        error =>  this.errorMessage = <any>error);
  }

  deleteGroceryItem(id:number) {

    this.dataService.deleteRecord("grocery", id)
      .subscribe(
        grocery => {this.successMessage = "Record(s) deleted succesfully"; this.displayGroceryItems(); },
        error =>  this.errorMessage = <any>error);
  }

  sendGroceryToFridge(id:number) {
    this.dataService.manageGroceryRecord("fridge", id)
      .subscribe(
        item => {this.successMessage = "Record(s) moved to fridge succesfully"; this.displayGroceryItems(); },
        error =>  this.errorMessage = <any>error);
  }

  // //email
  // sendEmail(req, resp){
    
  
  //    this.emailservice.sendEmail2();
 
  //  }


  //send grocry list modal
  openLoginModal(){

    let dialogRef = this.dialog.open(GroceryEmailFormComponent, {
      height: '400px',
      width: '600px',
    });

  }
    


}
