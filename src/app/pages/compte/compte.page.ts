import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { User } from 'src/model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class ComptePage {

  userName: string;
  userID: string;

  constructor(
    private userService: UserService,
    private afs: AngularFirestore,
    private authService: AuthenticationService,
    private router: Router) {

  }

  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
