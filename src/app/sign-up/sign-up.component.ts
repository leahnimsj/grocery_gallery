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

  signUp;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  sendSignUpForm(signUp: NgForm){
 
      this.dataService.addRecord("signup", signUp.value)
          .subscribe(
            signUp => this.successMessage = "Signup Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.signUp = {};
    

  }


  clickButtonConsole(signUp: NgForm){
    console.log(signUp.value)

  }




}

