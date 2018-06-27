import { UserFirebaseService } from './../user-firebase.service';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  registeredUid: any;
  constructor( public authenticationService: AuthenticationService, public userFirebaseService: UserFirebaseService,
               public router: Router) { }

  ngOnInit() {
  }

  register(){
    const promise = this.authenticationService.emailRegistration(this.email, this.password);
    promise.then( (data) => {
      alert('Usuario registrado con éxito!');
      console.log(data);
      this.registeredUid = data.user.uid;
      this.insertOnDatabase(this.registeredUid);
      console.log(this.registeredUid);
    }).catch( (error) => {
      alert('Hubo un error');
      console.log(error);
    })
  }
  insertOnDatabase(uid) {
    const user = {
      user_id: uid,
      name: this.name,
      email: this.email
    };
    const promise = this.userFirebaseService.createUser(user);
    promise.then( (data) => {
      console.log(data);
    }).catch( (error) => {
      console.log(error);
    });
  }
  login() {
    const promise = this.authenticationService.emailLogin(this.email, this.password);
    promise.then( (data) => {
      alert('Usuario loggeado con éxito');
      console.log(data);
      this.router.navigate(['/home']);
    }).catch( (error) => {
      alert('Ocurrió un error');
      console.log(error);
    })
  }

}
