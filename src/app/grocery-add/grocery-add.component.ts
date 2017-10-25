import { Component, OnInit, Inject, Input, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatFormFieldControl, MatFormField, MatInput } from '@angular/material';

@Component({
  selector: 'app-grocery-add',
  templateUrl: './grocery-add.component.html',
  styleUrls: ['./grocery-add.component.css']
})
export class GroceryAddComponent implements OnInit {

  quantity;
  
  quantityForm: NgForm;
  
  @ViewChild('quantityForm') currentForm: NgForm;

  constructor() { }

  ngOnInit() {
  }


  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    //if the form didn't change then do nothing
    if (this.currentForm === this.quantityForm) { return; }
    //set the form to the current form for comparison
    this.quantityForm = this.currentForm;
    //subscribe to form changes and send the changes to the onValueChanged method
    this.quantityForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    let form = this.quantityForm.form;

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
    'quantity': ''
  };

  validationMessages = {
    'quantity': {
      'required':  'Quantity is a required field.',
      'pattern': 'Quantity must be greater than 0.'
    }
  };
}
