import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { DataService } from '../data.service'


@Component({
  selector: 'app-manage-fridge',
  templateUrl: './manage-fridge.component.html',
  styleUrls: ['./manage-fridge.component.css']
})


export class ManageFridgeComponent implements OnInit {

  //@Output() sendDeleteClick = new EventEmitter<boolean>();

  constructor() { }
 successMessage: string;
 errorMessage: string;
  fridgeItems: any[];

  //constructor(private dataService: DataService) { }

  deleteItemClicked(){
    //this.sendDeleteClick.emit(true);
    console.log("true it clicked!")
  }
 

  ngOnInit() {
  }

 


}
