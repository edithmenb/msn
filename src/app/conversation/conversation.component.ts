import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFirebaseService } from '../user-firebase.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  user_id: any;
  friend = {};
  constructor(public activatedRoute: ActivatedRoute,
    public authenticationService: AuthenticationService, 
    public userFirebaseService: UserFirebaseService,
    public router: Router) {

    this.user_id = this.activatedRoute.snapshot.params['user_id'];
    //console.log(this.user_id);
    this.user_id = parseInt(this.user_id);
    this.friend = this.userFirebaseService.getUserById(this.user_id);
    //console.log(this.friend);
    this.checkSession();
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
}
