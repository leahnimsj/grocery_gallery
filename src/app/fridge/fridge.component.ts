import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service'
import { ManageFridgeComponent } from '../manage-fridge/manage-fridge.component';
import {DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; //ruben added for dialog
import { MatDialog, MatDialogConfig, MatDialogRef, MatIconModule, MatIconRegistry } from '@angular/material'; //ruben added


@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css'],


})

export class FridgeComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  fridgeItems: any[];
  dialogRef: MatDialogRef<ManageFridgeComponent> | null; //adding


  constructor (
    private dataService: DataService, 
    public dialog: MatDialog,
    public iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('green', sanitizer.bypassSecurityTrustResourceUrl('assets/images/checked.svg'))
    iconRegistry.addSvgIcon('red', sanitizer.bypassSecurityTrustResourceUrl('assets/images/warning.svg'))
    iconRegistry.addSvgIcon('yellow', sanitizer.bypassSecurityTrustResourceUrl('assets/images/play-button.svg'))
    iconRegistry.addSvgIcon('black', sanitizer.bypassSecurityTrustResourceUrl('assets/images/delete.svg'))
  }

  ngOnInit() {
    this.displayFridgeItems(); 
  }



  displayFridgeItems() {
    this.dataService.getRecords("fridge")
      .subscribe(
        fridgeItems => this.fridgeItems = fridgeItems,
        error =>  this.errorMessage = <any>error);
  }

  openManageFormModal(id:number){
    let dialogRef = this.dialog.open(ManageFridgeComponent, {
      height: '400px',
      width: '8900px',
      data: { editId: id }

    });

 
  

    console.log(id);
    

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        if (result == "delete"){
          this.deleteFridgeItem(id)
        } 

        else if (result == "wasted"){
          this.wastedFridgeItem(id)
        } 

        else if (result == "finished"){
          this.finishedFridgeItem(id)
        } 

      

      })

    }

    closeManageFormModal(){
      let dialogRef = this.dialog.closeAll    
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
