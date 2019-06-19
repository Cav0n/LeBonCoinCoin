import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { User } from 'src/model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class ComptePage implements OnInit {

  user;
  userID = '';

  constructor(
    private userService: UserService,
    private afs: AngularFirestore,
    private authService: AuthenticationService,
    private router: Router) {
      this.userID = firebase.auth().currentUser.uid;
  }

  ngOnInit(): void {
    this.user = this.afs.collection('users').doc<User>(this.userID).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = this.userID;
        return user;
      })
    ).subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
