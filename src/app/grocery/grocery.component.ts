import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EmailService } from '../email.service';



//modal
import { GroceryEmailFormComponent} from '../grocery-email-form/grocery-email-form.component';
import { MatDialogModule } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconModule, MatIconRegistry, MatButtonModule, MatButtonToggleModule } from '@angular/material';
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
  emailRecord: string;


  constructor (
    private dataService: DataService, 
    private emailservice:EmailService, 
    public dialog: MatDialog,
    public iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer
  ) {
      iconRegistry.addSvgIcon('complete', sanitizer.bypassSecurityTrustResourceUrl('assets/images/checked.svg'))
      iconRegistry.addSvgIcon('red', sanitizer.bypassSecurityTrustResourceUrl('assets/images/warning.svg'))
      iconRegistry.addSvgIcon('black', sanitizer.bypassSecurityTrustResourceUrl('assets/images/delete.svg'))
      iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('assets/images/edit.svg'))
      iconRegistry.addSvgIcon('remove', sanitizer.bypassSecurityTrustResourceUrl('assets/images/close.svg'))
      iconRegistry.addSvgIcon('fridge', sanitizer.bypassSecurityTrustResourceUrl('assets/images/fridgegrey.svg'))
    }


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
        grocery => {this.successMessage = "Grocery item deleted."; this.displayGroceryItems(); },
        error =>  this.errorMessage = <any>error);
  }


  sendEmail(email:string) {
      var obj = JSON.parse(email);
       this.dataService.postEmail(obj)
        .subscribe(
          email => {this.successMessage = "email sent"},
          error => this.errorMessage = <any>error
        );
     }

    //  modal code
  openLoginModal(){

    let dialogRef = this.dialog.open(GroceryEmailFormComponent, {
      height: '250px',
      width: '600px',
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result){
        this.emailRecord = '{"email": "' + result + '"}'
        this.sendEmail(this.emailRecord);
      } 

    })

  }

}
