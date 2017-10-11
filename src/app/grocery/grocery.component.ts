import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  groceryItems: any[];

  constructor (private dataService: DataService) {}

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
        grade => {this.successMessage = "Record(s) deleted succesfully"; this.displayGroceryItems(); },
        error =>  this.errorMessage = <any>error);
  }
    


}
