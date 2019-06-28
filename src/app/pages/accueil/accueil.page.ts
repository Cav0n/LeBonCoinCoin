import { ArticlePage } from './../article/article.page';
import { Component } from '@angular/core';
import { Article } from 'src/model/Article';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/model/User';

@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss']
})
export class AccueilPage {

  articles;

  constructor(
    public navController: NavController,
    private afs: AngularFirestore,
    private user: UserService
    ) {
      this.loadArticles();
    }

async loadArticles() {
    this.articles = this.afs.collection('articles').valueChanges();
}

  favoriteArticle(articleID: string) {
    const user = this.user.currentUser as User;
    user.favoris.push(articleID);
    console.log(articleID);
    console.log(user.favoris);
   }

  navigateToArticleDetail(articleId: string): void {
    this.navController.navigateForward('/article/' + articleId);
  }

  navigateToNewArticle(): void {
    this.navController.navigateForward('/new-article');
  }
}
