import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    { nick: '1 Mi nick', subNick: 'Mi subnick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email.com', userId: 1 },
    { nick: '2 Mi nick', subNick: 'Mi subnick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email.com', userId: 2 },
    { nick: '3 Mi nick', subNick: 'Mi subnick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email.com', userId: 3 },
    { nick: '4 Mi nick', subNick: 'Mi subnick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email.com', userId: 4 },
  ]
  constructor() { }

  getUsers() {
    return this.users;
  }
  getUserById( userId){
    let user = {};
    debugger;
    user = this.users.filter( (u) => {
      return u.userId == userId;
    })[0];
    return user;
  }
}
