import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { MatFormFieldModule, MatInputModule, MatFormFieldControl, MatFormField, MatInput } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-grocery-email-form',
  templateUrl: './grocery-email-form.component.html',
  styleUrls: ['./grocery-email-form.component.css']
})
export class GroceryEmailFormComponent implements OnInit {

  name;

  sharedEmail = 'go@gmail.com'; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer,
) 

  { 
    iconRegistry.addSvgIcon('cross-out', sanitizer.bypassSecurityTrustResourceUrl('assets/images/cross-out.svg'))
  }

  ngOnInit() {

  }


}
