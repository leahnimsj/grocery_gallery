import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../session-data.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  logout;

  userLoggedIn: boolean;
  // declare dataService so that once dataService is injected and runs its own constructor, we can create a copy in this component (however, can also do this using private in constructor)
  // dataService: SessionDataService;

  constructor(
    // injecting our data service into the nav component so that before nav renders it will run session data service
    private dataService: SessionDataService,
    private originalDataService: DataService
  ) { 
    this.dataService.userChanged.subscribe(isLoggedIn => {
      (this.userLoggedIn = isLoggedIn)
      console.log(isLoggedIn)
    }
    )
    
  }
  

  ngOnInit() {
    // 
    this.userLoggedIn = this.dataService.loginResult
  }

  logOut(){
    this.originalDataService.logOut("logout")
        .subscribe(
          logout => {
            this.successMessage = "Thanks for visiting!";
          },  
          error =>  this.errorMessage = <any>error);
          this.logout = {};

}


}
