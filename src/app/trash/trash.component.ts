import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  trashItems: any[];
  finishItems: any[];

  constructor (private dataService: DataService) {}

  ngOnInit() {
    this.displayTrashItems(); 
    this.displayFinishItems()
  }

  displayTrashItems() {
    this.dataService.getTrash("wasted")
      .subscribe(
        trashItems => this.trashItems = trashItems,
        error =>  this.errorMessage = <any>error);
  }

  displayFinishItems() {
    this.dataService.getTrash("finished",)
      .subscribe(
        finishItems => this.finishItems = finishItems,
        error =>  this.errorMessage = <any>error);
  }

}
