import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';

@Component({
  selector: 'app-fridge-form',
  templateUrl: './fridge-form.component.html',
  styleUrls: ['./fridge-form.component.css']
})
export class FridgeFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  fridgeData;

  fridgeForm: NgForm;

  @ViewChild('fridgeForm') currentForm: NgForm;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("fridge", +params['id']))
      .subscribe(fridge => this.fridgeData = fridge);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      (+params['id']) ? this.getRecordForEdit() : null;
    });
  }

  saveFridge(fridge: NgForm){
    if(typeof fridge.value.fridge_id === "number"){
      this.dataService.editRecord("fridge", fridge.value, fridge.value.fridge_id)
          .subscribe(
            fridge => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("fridge", fridge.value)
          .subscribe(
            fridge => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.fridgeData = {};
    }

  }

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
    'category': ''
  };

  validationMessages = {
    'name': {
      'required':  'Fridge item name is a required field.',
      'minlength': 'First item cannot be less than 2 characters.',
      'maxlength': 'First item cannot be more than 255 characters.'
    },
    'expirationDate': {
      'required':  'Expiration date is a required field.',
      'pattern': 'Expiratione date should be in the following format: YYYY-MM-DD.'
    },
    'category': {
      'required': 'Food category is a required field.'
    }
  };

}
