import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { auth, firestore } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class ComptePage {
  userName = '';

  constructor(private userService: UserService) {
    console.log(firebase.auth().currentUser.email);
  }

}
