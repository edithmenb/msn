import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public angularFireDatabase: AngularFireDatabase, public angularFireAuth: AngularFireAuth) { }

  emailRegistration(email, password) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  emailLogin( email, password) {
    return this.angularFireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
  }
}
