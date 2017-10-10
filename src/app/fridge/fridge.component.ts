import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {

  errorMessage: string;
  fridgeItems: any[];

  constructor (private dataService: DataService) {}

  ngOnInit() {
    this.displayFridgeItems(); 
  }

  displayFridgeItems() {
    this.dataService.getRecords("fridge")
      .subscribe(
        fridgeItems => this.fridgeItems = fridgeItems,
        error =>  this.errorMessage = <any>error);
  }

  deleteFridgeItem(id:number) {
    
    alert("delete feature has not been implemented yet")
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
