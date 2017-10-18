import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service'
import { ManageFridgeComponent } from '../manage-fridge/manage-fridge.component';
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

  errorMessage: string;
  successMessage: string;
  fridgeItems: any[];
  count3;
  count4;
  quantityRecord: string;


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
  }

  ngOnInit() {
    this.displayFridgeItems(); 
    this.displayAlerts();
  }

  displayAlerts(){
    this.dataService.getAlerts("3")
      .subscribe(
        count => this.count3 = count,
        error => this.errorMessage = <any>error);
    this.dataService.getAlerts("4")
        .subscribe(
          count => this.count4 = count,
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
          height: '400px',
          width: '600px',
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
      console.log(obj)
      console.log(id)

      this.dataService.moveFridgeRecord("grocery", id, obj)
        .subscribe(
          result => {
            this.successMessage = "Record added to grocery list!"; 
            this.displayFridgeItems();
          },
          error => this.errorMessage = <any>error);
    }
  
    deleteFridgeItem(id:number) {
      
         this.dataService.deleteRecord("fridge", id)
           .subscribe(
             item => {this.successMessage = "Record(s) deleted succesfully"; this.displayFridgeItems(); },
             error =>  this.errorMessage = <any>error);
       }

    wastedFridgeItem(id:number) {
      this.dataService.manageFridgeRecord("waste", id)
      .subscribe(
        item => {this.successMessage = "Record(s) deleted succesfully"; this.displayFridgeItems(); },
        error =>  this.errorMessage = <any>error);
    }

    finishedFridgeItem(id:number) {
      this.dataService.manageFridgeRecord("finish", id)
      .subscribe(
        item => {this.successMessage = "Record(s) deleted succesfully"; this.displayFridgeItems(); },
        error =>  this.errorMessage = <any>error);
    }

  
 



}
