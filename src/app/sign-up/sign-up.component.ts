import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: NgForm;
  successMessage: string;
  errorMessage: string;
  password;
  confirmPassword;
  passwordError;

  signUp;

  constructor(private dataService: DataService) { }

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
          signUp => this.successMessage = "Signup Record added succesfully",
          error =>  this.errorMessage = <any>error);
          this.signUp = {};

      } else {
        this.passwordError = "Passwords don't match. Please try again."


      }
 
      
    

  }


  clickButtonConsole(signUp: NgForm){
    console.log(signUp.value)

  }




}

