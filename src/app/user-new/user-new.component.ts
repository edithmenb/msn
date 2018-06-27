import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  user = {
    name: '',
    nick: '',
    subnick: '',
    email:'',
    status:'',
    avatar: '',
    user_id: Date.now()

  }
  constructor(public userFirebaseService: UserFirebaseService) { }

  ngOnInit() {
  }

  addUser() {
    const promise = this.userFirebaseService.createUser(this.user);
    promise.then( () => {
      alert('Usuario agregado con éxito!');
    }).catch( (error) => {
      alert('No se pudo agregar el usuario');
      console.log(error);
    });
  }
}
