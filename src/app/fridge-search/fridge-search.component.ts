import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, Input }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatIconRegistry } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DataService } from '../data.service';
@Component({
  selector: 'app-fridge-search',
  templateUrl: './fridge-search.component.html',
  styleUrls: ['./fridge-search.component.css']
})


export class FridgeSearchComponent implements OnInit {
  
  foodItem = "";

  foodItems: any[];
  successMessage;
  errorMessage;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('select', sanitizer.bypassSecurityTrustResourceUrl('assets/images/verification.svg'))
   }

  ngOnInit() {

    this.route.params
    .subscribe((params: Params) => {
      this.foodItem = params['name'] 
    })
  }

  searchFood(search: NgForm){
      this.dataService.getFoodSearch(search.value.searchTerm)
          .subscribe(
            foodItems => this.foodItems = foodItems,
            
            error => {
              if(error.includes("500")){
                this.errorMessage = "Food item not found.  Please refine your search."
              } else {
                this.errorMessage = error.error
              }
            })
  }


}