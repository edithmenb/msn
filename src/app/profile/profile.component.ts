import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uid:any;
  user = {
    nick: '',
    name: '',
    email: '',
    subnick: '',
    avatar: '',
    status: '',
    user_id: ''
  }
  userAux: any;

  constructor( public authenticationService: AuthenticationService, 
    public router: Router, 
    public userFirebaseService: UserFirebaseService) { 
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
  saveUser(){
    const stream = this.userFirebaseService.editUser(this.user);
    stream.then( (result) => {
      //console.log(result)
      this.router.navigate(['/home']);
    }).catch( (error) => {
      console.log(error);
    })
  }

  pullInfo(){
    const stream = this.authenticationService.getStatus();
    stream.subscribe( (result) => {
      this.uid = result.uid;
      const objUser = this.userFirebaseService.getUserById(this.uid);
      objUser.valueChanges().subscribe( (result) => {
        this.userAux = result;
        this.user = this.userAux;
        //console.log(this.user);
      })
    })
  }
}
