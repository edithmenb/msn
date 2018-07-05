import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFirebaseService } from '../user-firebase.service';
import { AuthenticationService } from '../authentication.service';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  user_id: any;
  friend: any;
  user: any;
  form: any ={message: ''};
  message: string;
  ids= [];
  conversation: any;
  constructor(public activatedRoute: ActivatedRoute,
    public authenticationService: AuthenticationService, 
    public userFirebaseService: UserFirebaseService,
    public conversationService: ConversationService,
    public router: Router) {

    this.user_id = this.activatedRoute.snapshot.params['user_id'];
    //console.log(this.user_id);
    //this.user_id = parseInt(this.user_id);
    //console.log(this.friend);
    this.checkSession();
    this.getFriend();
    
   }

  ngOnInit() {
  }
  getNickById(id) {
    if ( id === this.user.user_id ) {
      return this.user.nick;
    }
    else {
      return this.friend.nick
    }
  }
  sendZumbido() {
    this.ids = [this.friend.user_id,this.user.user_id].sort();
    const messageObject = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      type: 'zumbido'
    };
    //console.log(messageObject);
    this.conversationService.createConversation(messageObject).then( () => {
      //mensaje enviado
      const audio = new Audio('assets/sound/zumbido.m4a');
      audio.play();
    }) ;
    this.message ='';
  }
  sendMessage() {
    this.ids = [this.friend.user_id,this.user.user_id].sort();
    const messageObject = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      content: this.message.replace(/\n$/,''),
      type: 'text'
    };
    //console.log(messageObject);
    this.conversationService.createConversation(messageObject).then( () => {
      //mensaje enviado
      const audio = new Audio('assets/sound/new_message.m4a');
      audio.play();
    }) ;
    this.message ='';
  }
  checkSession(){
    const stream = this.authenticationService.getStatus();
    stream.subscribe( (result) => {
     if(result == null){
      this.router.navigate(['/login']);
     }
    }); 
  }
  getFriend() {
    const stream = this.userFirebaseService.getUserById(this.user_id);
    stream.valueChanges().subscribe( (result) => {
      this.friend = result;
      console.log(this.friend);
      this.getUser();
    });
    
  }
  getConversationMessages() {
    this.ids = [this.friend.user_id, this.user.user_id].sort();
    const stream = this.conversationService.getConversation(this.ids.join('||'));
    stream.valueChanges().subscribe( (resultConversation) => {
      this.conversation = resultConversation;
      console.log(this.conversation);
    })
  }
  getUser() {
    this.authenticationService.getStatus().subscribe( (response) => {
      this.userFirebaseService.getUserById(response.uid).valueChanges().subscribe( (user) => {
        this.user = user;
        //console.log(this.user);
        this.getConversationMessages();
      })
    })
  }
}
