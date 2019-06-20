import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';
import { User } from 'src/model/User';

@Component({
  selector: 'app-favoris',
  templateUrl: 'favoris.page.html',
  styleUrls: ['favoris.page.scss']
})
export class FavorisPage implements OnInit {

  userID: string;
  favoris: Array<string>;

  constructor(private userService: UserService) { 
    this.userID = firebase.auth().currentUser.uid;
  }

  ngOnInit(): void {
    const user = this.userService.currentUser as User;
    this.favoris = user.favoris;
  }
}
