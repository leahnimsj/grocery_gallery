import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-grocery-add',
  templateUrl: './grocery-add.component.html',
  styleUrls: ['./grocery-add.component.css']
})
export class GroceryAddComponent implements OnInit {

  quantity;
  
  constructor() { }

  ngOnInit() {
  }

}
