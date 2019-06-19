import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private fireAuth: AngularFireAuth, private userService: UserService) { }

  signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async logIn(email: string, password: string) {
    return (await this.fireAuth.auth.signInWithEmailAndPassword(email, password)).user;
  }

  logOut(): Promise<void> {
    if (this.isAuthenticated) {
      return this.fireAuth.auth.signOut();
    }
  }

  isAuthenticated(): boolean {
    return this.fireAuth.auth.currentUser != null;
  }
}
