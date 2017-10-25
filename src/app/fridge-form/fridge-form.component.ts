import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatFormFieldControl, MatFormField, MatInput } from '@angular/material';


import { DataService } from '../data.service';

@Component({
  selector: 'app-fridge-form',
  templateUrl: './fridge-form.component.html',
  styleUrls: ['./fridge-form.component.css']
})
export class FridgeFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  fridge: any = {};
  fridgeForm: NgForm;

  @ViewChild('fridgeForm') currentForm: NgForm;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
    
    .subscribe((params: Params) => {
      if (this.route.snapshot.routeConfig.path.includes("edit")) {
        this.getRecordForEdit()
      } else if(this.route.snapshot.routeConfig.path.includes("search")) {
        this.getSearchforAdd()
      } else {
        this.fridge.purchasedDate = this.getTodaysDate()
      }
      
    });
  }

  // date methods

  getTodaysDate(){
    let today = new Date();
    let dd:any = today.getDate();
    let mm:any = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    return yyyy + '-' + mm + '-' + dd
  }
  
  checkExpirationDate(exDate){
    let currentDate = new Date(this.getTodaysDate())
    let expirationDate = new Date(exDate)
    if (expirationDate < currentDate){
      this.errorMessage = "Warning: expiration date has passed. Please review before adding to your fridge."
    } 

  }

  // get methods for populating form via edit or food item search

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("fridge", +params['id']))
      .subscribe(fridge => {this.fridge = fridge});
  }

  getSearchforAdd(){

    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("search", +params['id']))
      .subscribe(
        fridge => {
          this.fridge = fridge
          this.fridge.purchasedDate = this.getTodaysDate()
        }
      );
    
  }

  // method for adding and editing fridge records

  saveFridge(fridge: NgForm){
      if(typeof fridge.value.id === "number"){
        this.dataService.editRecord("fridge", fridge.value, fridge.value.id)
            .subscribe(
              fridge => {
                this.successMessage = "Record updated succesfully";
                this.router.navigate(['/fridge']);
            },
              error =>  this.errorMessage = <any>error);
      }else{
        this.dataService.addRecord("fridge", fridge.value)
            .subscribe(
              fridge => {
                this.successMessage = "Record added succesfully";
                this.router.navigate(['/fridge']);
            },
              error =>  this.errorMessage = <any>error);
              this.fridge = {};
      }
    
  }

  // below is form code

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    //if the form didn't change then do nothing
    if (this.currentForm === this.fridgeForm) { return; }
    //set the form to the current form for comparison
    this.fridgeForm = this.currentForm;
    //subscribe to form changes and send the changes to the onValueChanged method
    this.fridgeForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    let form = this.fridgeForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'expirationDate': '',
    'purchasedDate': ''
  };

  validationMessages = {
    'name': {
      'required':  'Fridge item name is a required field.',
      'minlength': 'First item cannot be less than 2 characters.',
      'maxlength': 'First item cannot be more than 255 characters.'
    },
    'expirationDate': {
      'required':  'Expiration date is a required field.',
      'pattern': 'Expiration date should be in the following format: YYYY-MM-DD.'
    },
    'purchasedDate': {
      'pattern': 'Purchased date should be in the following format: YYYY-MM-DD.'
    }
  };

}
