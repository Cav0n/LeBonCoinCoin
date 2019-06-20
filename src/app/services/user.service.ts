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

  private userID;
  private userCollection: AngularFirestoreCollection<User>;
  public currentUser;

  constructor(private fireStore: AngularFirestore) {
    this.userID = firebase.auth().currentUser.uid;
    this.userCollection = this.fireStore.collection<User>('users');

    this.currentUser = this.userCollection.doc<User>(this.userID).valueChanges().pipe(
      take(1),
      map(user => {
        return user;
      })
    ).subscribe(user => {
      this.currentUser = user;
    });
   }

   addUser(user: User): Promise<any> {
     return this.userCollection.add(user);
   }

   updateUser(user: User): Promise<any> {
     return this.userCollection.doc(user.id).update({
       username: user.username,
     });
   }

   deleteUser(user: User): Promise<any> {
     return this.userCollection.doc(user.id).delete();
   }
}
