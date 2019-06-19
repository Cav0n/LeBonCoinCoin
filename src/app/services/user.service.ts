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

  private users: Observable<any>;
  private userCollection: AngularFirestoreCollection<User>;
  private currentUser: User;

  constructor(private fireStore: AngularFirestore) {
    this.userCollection = this.fireStore.collection<User>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return {
            id,
            username: data.username
          };
        });
      })
    );
   }

   getUsers(): Observable<User[]> {
     return this.users;
   }

   getUser(id: string): Observable<User> {
     return this.userCollection.doc<User>(id).valueChanges().pipe(
       take(1),
       map(user => {
         user.id = id;
         return user;
       })
     );
   }

   getCurrentUser() {
    const id = firebase.auth().currentUser.uid;

    const currentUser = this.fireStore.doc<User>('users/' + id);
    console.log('id: ' + id + ' user : ' + currentUser);
    return currentUser;
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
