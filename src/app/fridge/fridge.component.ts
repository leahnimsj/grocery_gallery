import { Component, OnInit } from '@angular/core';
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

    }

    closeManageFormModal(){
      let dialogRef = this.dialog.closeAll    
    }

  

 

  deleteFridgeItem(id:number) {
    

        //not ready to implement delete yet
     /*    let dialogRef = this.dialog.open(DeleteConfirmComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.dataService.deleteRecord("student", id)
              .subscribe(
                student => {this.successMessage = "Record(s) deleted succesfully"; this.getStudents(); },
                error =>  this.errorMessage = <any>error);
          }
        }); */
      }

}
