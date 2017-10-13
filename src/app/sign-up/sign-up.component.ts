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

  // sendSignUpForm(fridge: NgForm){
  //   if(typeof fridge.value.id === "number"){
  //     this.dataService.editRecord("fridge", fridge.value, fridge.value.id)
  //         .subscribe(
  //           fridge => this.successMessage = "Record updated succesfully",
  //           error =>  this.errorMessage = <any>error);
  //   }else{
  //     this.dataService.addRecord("fridge", fridge.value)
  //         .subscribe(
  //           fridge => this.successMessage = "Record added succesfully",
  //           error =>  this.errorMessage = <any>error);
  //           this.fridge = {};
  //   }

  // }


  clickButtonConsole(signUp: NgForm){
    console.log(signUp.value)

  }




}

