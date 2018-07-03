import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../user-firebase.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  showFriends = true;
  uid: any;
  myUser: any;
  query: string;
  
  constructor(public userFirebaseService: UserFirebaseService, 
    public authenticationService: AuthenticationService,
    public router: Router) {

    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe( (result) => {
      this.users = result;
    });
    this.checkSession();
    this.pullInfo();
  }

  ngOnInit() {
  }

  checkSession(){
    const stream = this.authenticationService.getStatus();
    stream.subscribe( (result) => {
     if(result == null){
      this.router.navigate(['/login']);
     }
    }); 
  }
  
  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }
  showHideList(){
    if(this.showFriends){
      this.showFriends = false;
    }
    else {
      this.showFriends = true;
    }
  }
  pullInfo(){
    const stream = this.authenticationService.getStatus();
    stream.subscribe( (result) => {
      this.uid = result.uid;
      const objUser = this.userFirebaseService.getUserById(this.uid);
      objUser.valueChanges().subscribe( (result) => {
        this.myUser = result;
      })
    })
  }
  
}
