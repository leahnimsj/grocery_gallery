import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatFormFieldControl, MatFormField, MatInput } from '@angular/material';

import { DataService } from '../data.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  signUpForm: NgForm;

  @ViewChild('signUpForm') currentForm: NgForm;


  password;
  confirmPassword;
  passwordError;

  signUp;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  

  checkPassword(password, confirmPassword){
    if(password === confirmPassword){
      return true
    }
  }

  sendSignUpForm(signUp: NgForm){
      if(this.checkPassword(this.password, this.confirmPassword)){

        this.dataService.addRecord("user/signup", signUp.value)
        .subscribe(
          signUp => {
            this.successMessage = "Signup Record added succesfully",
            this.router.navigate(['/login'])
        },
          error =>  this.errorMessage = <any>error);
          this.signUp = {};

      } else {
        this.passwordError = "Passwords don't match. Please try again."


      } 

  }

  clickButtonConsole(signUp: NgForm){
    console.log(signUp.value)

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    //if the form didn't change then do nothing
    if (this.currentForm === this.signUpForm) { return; }
    //set the form to the current form for comparison
    this.signUpForm = this.currentForm;
    //subscribe to form changes and send the changes to the onValueChanged method
    this.signUpForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    let form = this.signUpForm.form;

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
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'confirmPassword': ''

  };

  validationMessages = {
    'firstName': {
      'required':  'First Name is a required field.',
      'minlength': 'First Name cannot be less than 2 characters.',
      'maxlength': 'First Name cannot be more than 255 characters.'
    },
    'lastName': {
      'required':  'Last Name is a required field.',
      'minlength': 'Last Name cannot be less than 2 characters.',
      'maxlength': 'Last Name cannot be more than 255 characters.'
    },
    'email': {
      'required':  'Email is a required field.',
      'pattern': 'Email must be a valid emai format'
    },

    'password': {
      'required':  'Password is a required field.',
      'minlength': 'Password cannot be less than 6 characters.'
    },

    'confirmPassword': {
      'required':  'Confirm Password is a required field.',
      'minlength': 'Confirm Passsword cannot be less than 6 characters.'
    }
  };




}

