import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-grocery-email-form',
  templateUrl: './grocery-email-form.component.html',
  styleUrls: ['./grocery-email-form.component.css']
})
export class GroceryEmailFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log ("input your email")
  }

  sendEmail(){
    alert("sent")
  }

}
