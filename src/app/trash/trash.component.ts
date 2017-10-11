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

  constructor (private dataService: DataService) {}

  ngOnInit() {
    this.displayTrashItems(); 
  }

  displayTrashItems() {
    this.dataService.getTrash("wasted")
      .subscribe(
        trashItems => this.trashItems = trashItems,
        error =>  this.errorMessage = <any>error);
  }

}
