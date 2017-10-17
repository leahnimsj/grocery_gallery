import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';
@Component({
  selector: 'app-fridge-search',
  templateUrl: './fridge-search.component.html',
  styleUrls: ['./fridge-search.component.css']
})


export class FridgeSearchComponent implements OnInit {

  foodItems: any[];
  successMessage;
  errorMessage;
  constructor(
    private dataService: DataService


  ) { }

  ngOnInit() {
  }

  searchFood(search: NgForm){
    console.log(search.value.searchTerm)
      this.dataService.getFoodSearch(search.value.searchTerm)
          .subscribe(
            foodItems => this.foodItems = foodItems,
            error =>  this.errorMessage = <any>error);
    }

 



}
