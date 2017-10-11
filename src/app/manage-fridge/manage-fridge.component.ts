import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-manage-fridge',
  templateUrl: './manage-fridge.component.html',
  styleUrls: ['./manage-fridge.component.css']
})

export class ManageFridgeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
 

  ngOnInit() {

    console.log (this.data.editId)
  }

  


}
