import { Article } from 'src/model/Article';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { User } from 'src/model/User';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.page.html',
  styleUrls: ['./new-article.page.scss'],
})
export class NewArticlePage implements OnInit {

  nom: string;
  description: string;
  categorie: string;
  prix: number;

  user;
  userID;

  constructor(private toastService: ToastService,
              private userService: UserService,
              private afs: AngularFirestore,
              private navController: NavController
    ) {
      this.userID = firebase.auth().currentUser.uid;
  }

  ngOnInit() {
  }

  submit() {
    const verif = this.checkFields();

    if (!verif.passed) {
      this.toastService.presentToast(verif.message);
      return;
    }

    this.user = this.afs.collection('users').doc<User>(this.userID).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = this.userID;
        return user;
      })
    ).subscribe(user => {
      this.user = user;
    });

    const article = new Article('idTemp', this.nom, this.description, this.user, this.categorie, this.prix);
    this.afs.collection<Article>('articles').add(article);

    this.navController.back();
  }

  checkFields(): {passed: boolean, message: string} {
    let passed = true;
    let message = '';

    if (this.prix < 0) {
      passed = false;
      message = 'le prix doit-être superieur ou égale à 0';
    } else if ( this.nom == null || this.description == null ||
                  this.categorie == null || this.prix == null) {
      passed = false;
      message = 'Tout les champs doivent être remplis';
    }
    return {passed, message};
  }

}
