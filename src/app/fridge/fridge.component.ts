import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service'
import { MatDialog, MatDialogConfig, MatDialogRef, MatIconModule, MatIconRegistry, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material'; //ruben added
import { GroceryAddComponent } from '../grocery-add/grocery-add.component';

import {DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css'],


})

export class FridgeComponent implements OnInit {

  key;
  alerts;
  keyshow;
  errorMessage: string;
  successMessage: string;
  fridgeItems: any[];
  count3 =0;
  count4 =0;
  quantityRecord: string;
  warningClose;
  warningClicked = false;
 

  constructor (
    private dataService: DataService, 
    public dialog: MatDialog,
    public iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('complete', sanitizer.bypassSecurityTrustResourceUrl('assets/images/checked.svg'))
    iconRegistry.addSvgIcon('red', sanitizer.bypassSecurityTrustResourceUrl('assets/images/warning.svg'))
    iconRegistry.addSvgIcon('yellow', sanitizer.bypassSecurityTrustResourceUrl('assets/images/play-button.svg'))
    iconRegistry.addSvgIcon('black', sanitizer.bypassSecurityTrustResourceUrl('assets/images/delete.svg'))
    iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('assets/images/edit.svg'))
    iconRegistry.addSvgIcon('remove', sanitizer.bypassSecurityTrustResourceUrl('assets/images/close.svg'))
    iconRegistry.addSvgIcon('green', sanitizer.bypassSecurityTrustResourceUrl('assets/images/cabbage.svg'))
    iconRegistry.addSvgIcon('alert', sanitizer.bypassSecurityTrustResourceUrl('assets/images/alert_warning.svg'))
    iconRegistry.addSvgIcon('cross-out', sanitizer.bypassSecurityTrustResourceUrl('assets/images/cross-out.svg'))
    iconRegistry.addSvgIcon('groceries', sanitizer.bypassSecurityTrustResourceUrl('assets/images/groceries2.svg'))
  }

  ngOnInit() {
    this.displayFridgeItems(); 
    this.displayAlerts();
  }

  displayWarning(){
    if(this.warningClicked){
      this.closeWarning();
    }

    else{
      this.displayAlerts()
    }
  }
  

 closeWarning(){
  this.warningClose = document.getElementById("warningAll");
  this.warningClose.style.visibility = 'hidden'
 }



  isNumber(val){
    return typeof val === 'number';
  }

  displayAlerts(){
    this.dataService.getAlerts("3")
      .subscribe(
        count => {
          if(this.isNumber(count)){
            this.count3 = count
          } else {
            this.count3 = 0
          }
        },
  
        error => this.errorMessage = <any>error
      );
      
    this.dataService.getAlerts("4")
        .subscribe(
          count => {
            if(this.isNumber(count)){
              this.count4 = count
            } else {
              this.count4 = 0
            }
          },
          error => this.errorMessage = <any>error
        );
  }

  displayFridgeItems() {
    this.dataService.getRecords("fridge")
      .subscribe(
        fridgeItems => this.fridgeItems = fridgeItems,
        error =>  this.errorMessage = <any>error);
  }

  // modal code
  openLoginModal(id:number){
    
        let dialogRef = this.dialog.open(GroceryAddComponent, {
          height: '250px',
          width: '800px',
        });
    
    // need to figure out how to get id here.....
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
    
          if (result){
            this.quantityRecord = '{"quantity": "' + result + '"}'
            this.moveFridgeToGrocery(id, this.quantityRecord);
          } 
    
    
        })
    
      }

    moveFridgeToGrocery(id:number, record: string){
      var obj = JSON.parse(record);

      this.dataService.moveFridgeRecord("grocery", id, obj)
        .subscribe(
          result => {
            this.successMessage = "Fridge/pantry item added to grocery list!"; 
            // this.displayFridgeItems();
          },
          error => this.errorMessage = <any>error
        );
    }
  
    deleteFridgeItem(id:number) {
      
         this.dataService.deleteRecord("fridge", id)
           .subscribe(
             item => {this.successMessage = "Fridge/pantry item deleted."; this.displayFridgeItems(); },
             error =>  this.errorMessage = <any>error);
       }

    wastedFridgeItem(id:number) {
      this.dataService.manageFridgeRecord("waste", id)
      .subscribe(
        item => {
          this.successMessage = "Fridge/pantry item thrown in wasted trash bin."; 
          this.displayFridgeItems(); },
        error =>  this.errorMessage = <any>error);
    }

    finishedFridgeItem(id:number) {
      this.dataService.manageFridgeRecord("finish", id)
      .subscribe(
        item => {this.successMessage = "Fridge/pantry item thrown in completed trash bin."; this.displayFridgeItems(); },
        error =>  this.errorMessage = <any>error);
    }
}
