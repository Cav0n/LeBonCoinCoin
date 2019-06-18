import { Article } from 'src/model/Article';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private toastService: ToastService,
              private userService: UserService,
    ) {
  }

  ngOnInit() {
  }

  submit() {
    const verif = this.checkFields();

    if (!verif.passed) {
      this.toastService.presentToast(verif.message);
      return;
    }

    // todo ajouter l'objet à la collection
    const article = new Article('unId', this.nom, this.description, this.userService.currentUser, this.categorie, this.prix);
  }

  checkFields(): {passed: boolean, message: string} {
    let passed = true;
    let message = '';

    if (this.prix < 0){
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
