import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { User } from 'src/model/User';

@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class ComptePage {

  user: AngularFirestoreDocument;
  sub;
  userName: string;
  userID: string;

  constructor(private userService: UserService, private afs: AngularFirestore) {
    console.log(firebase.auth().currentUser.uid);

  }

}
