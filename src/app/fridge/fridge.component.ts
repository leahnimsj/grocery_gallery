import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service'
import { ManageFridgeComponent } from '../manage-fridge/manage-fridge.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; //ruben added for dialog

import { MatDialog, MatDialogConfig, MatDialogRef,  } from '@angular/material'; //ruben added


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


  constructor (private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.displayFridgeItems(); 
  }

  displayFridgeItems() {
    this.dataService.getRecords("fridge")
      .subscribe(
        fridgeItems => this.fridgeItems = fridgeItems,
        error =>  this.errorMessage = <any>error);
  }

  openManageFormModal(){
    let dialogRef = this.dialog.open(ManageFridgeComponent, {
      height: '400px',
      width: '8900px',
    });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

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
  
 



}
