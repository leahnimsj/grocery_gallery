import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatFormFieldControl, MatFormField, MatInput } from '@angular/material';

import { DataService } from '../data.service';

@Component({
  selector: 'app-grocery-form',
  templateUrl: './grocery-form.component.html',
  styleUrls: ['./grocery-form.component.css']
})
export class GroceryFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  grocery;


  groceryForm: NgForm;

  @ViewChild('groceryForm') currentForm: NgForm;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("grocery", +params['id']))
      .subscribe(grocery => this.grocery = grocery);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      (+params['id']) ? this.getRecordForEdit() : null;
    });
  }

  saveGrocery(grocery: NgForm){
    if(typeof grocery.value.id === "number"){
      this.dataService.editRecord("grocery", grocery.value, grocery.value.id)
          .subscribe(
            fridge => {
              this.successMessage = "Record updated succesfully",
              this.router.navigate(['/grocery'])
          },
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("grocery", grocery.value)
          .subscribe(
            grocery => {
              this.successMessage = "Record added succesfully",
              this.router.navigate(['/grocery'])
            },

            error =>  this.errorMessage = <any>error);
            this.grocery = {};
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    //if the form didn't change then do nothing
    if (this.currentForm === this.groceryForm) { return; }
    //set the form to the current form for comparison
    this.groceryForm = this.currentForm;
    //subscribe to form changes and send the changes to the onValueChanged method
    this.groceryForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    let form = this.groceryForm.form;

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
    'quantity': ''
  };

  validationMessages = {
    'name': {
      'required':  'Fridge item name is a required field.',
      'minlength': 'First item cannot be less than 2 characters.',
      'maxlength': 'First item cannot be more than 255 characters.'
    },
    'quantity': {
      'required':  'Quantity is a required field.',
    }
  };

}
