import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  login;
  loginForm: NgForm;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private sessionDataService: SessionDataService,
    private router: Router
  ) {}

  @ViewChild('loginForm') currentForm: NgForm;


  ngOnInit() {
  }

  saveLogin(login: NgForm){
      console.log(login.value)
      this.dataService.addRecord("login", login.value)
          .subscribe(
            login => {
              this.successMessage = "Record added succesfully";
              // on success of login method, we are storing a cookie with the response from login
              sessionStorage.setItem("user", login);
              // this is broadcasting to everyone listening to the sessionDataService that something changed - specifically now userChanged = true
              this.sessionDataService.userChanged.next(true);
              // this is to navigate to fridge on a succesful login
              this.router.navigate(['/fridge'])
            },  
            error =>  this.errorMessage = "<any>error");
            this.login = {};

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    //if the form didn't change then do nothing
    if (this.currentForm === this.loginForm) { return; }
    //set the form to the current form for comparison
    this.loginForm = this.currentForm;
    //subscribe to form changes and send the changes to the onValueChanged method
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    let form = this.loginForm.form;

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
    'email': '',
    'password': '',
  };

  validationMessages = {
    'email': {
      'required':  'Email/username is required for login.'
    },
    'password': {
      'required':  'Password is required for login.'
    }
  };

}