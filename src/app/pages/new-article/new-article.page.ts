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
import { Categorie, enumSelector } from 'src/model/Categorie';

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

  catEnum = enumSelector(Categorie);

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

    const newID = this.afs.createId();

    this.afs.collection('articles').doc(newID).set({
      id: newID,
      categorie: this.categorie,
      date: new Date(),
      description: this.description,
      nom: this.nom,
      prix: this.prix,
      vendeur: (this.userService.currentUser as User).id,
      ville: (this.userService.currentUser as User).ville
    });

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
