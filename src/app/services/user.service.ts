import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/User';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser;

  constructor(private fireStore: AngularFirestore) {
    this.currentUser = this.fireStore.collection('users').doc<User>(firebase.auth().currentUser.uid).valueChanges().pipe(
      take(1),
      map(user => {
        return user;
      })
    ).subscribe(user => {
      this.currentUser = user;
    });
   }

   addUser(user: User): Promise<any> {
     return this.fireStore.collection('users').doc(firebase.auth().currentUser.uid).set(user);
   }

   updateUser(user: User): Promise<any> {
     return this.fireStore.collection('users').doc(user.id).update({
       username: user.username,
     });
   }

   deleteUser(user: User): Promise<any> {
     return this.fireStore.collection('users').doc(user.id).delete();
   }
}
