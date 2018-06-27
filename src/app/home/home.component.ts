import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  myUser: any;
  showFriends = true;

  constructor(public userFirebaseService: UserFirebaseService) {
    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe( (result) => {
      this.users = result;
      this.myUser = this.users[0];
    });
   }

  ngOnInit() {
  }
  
  showHideList(){
    if(this.showFriends){
      this.showFriends = false;
    }
    else {
      this.showFriends = true;
    }
  }
  
}
