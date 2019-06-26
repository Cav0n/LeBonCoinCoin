import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';
import { User } from 'src/model/User';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from 'src/model/Article';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favoris',
  templateUrl: 'favoris.page.html',
  styleUrls: ['favoris.page.scss']
})
export class FavorisPage implements OnInit {

  userID: string;
  favoris: Array<string>;
  articles;

  constructor(private userService: UserService, private afs: AngularFirestore) { 
    this.userID = firebase.auth().currentUser.uid;
  }

  ngOnInit(): void {
    const user = this.userService.currentUser as User;
    this.favoris = user.favoris;
  }
}
