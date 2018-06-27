import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  user_id: any;
  friend = {};
  constructor(public activatedRoute: ActivatedRoute, public userFirebaseService: UserFirebaseService) {
    this.user_id = this.activatedRoute.snapshot.params['user_id'];
    console.log(this.user_id);
    this.user_id = parseInt(this.user_id);
    this.friend = this.userFirebaseService.getUserById(this.user_id);
    console.log(this.friend);
   }

  ngOnInit() {
  }

}
