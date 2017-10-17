import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SessionDataService {

  // userChanged is our observable that we created so that others can watch
  userChanged: Subject<boolean>
  loginResult: boolean;

  constructor() {
    // instantiate userChanged (type Subject - boolean)
    this.userChanged = new Subject<boolean>();
    // check to see if there is a cookie 
    if(sessionStorage.getItem("user") == "true"){
      // broadcast out userChanged and that parameter is true
      this.userChanged.next(true);

      // setting loginResult to true so that other things can access this
      this.loginResult = true;
    }
   }




}
