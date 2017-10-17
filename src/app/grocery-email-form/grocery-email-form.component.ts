import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-grocery-email-form',
  templateUrl: './grocery-email-form.component.html',
  styleUrls: ['./grocery-email-form.component.css']
})
export class GroceryEmailFormComponent implements OnInit {

  name;

  sharedEmail = 'go@gmail.com'; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  sendEmail(){
    alert("sent")
  }

}
