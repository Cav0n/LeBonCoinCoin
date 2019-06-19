import { ArticlePage } from './../article/article.page';
import { Component } from '@angular/core';
import { Article } from 'src/model/Article';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

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
     this.articles = afs.collection('articles').valueChanges();
     console.log(user.getCurrentUser());
    }

  deleteArticle(article: Article) {
    const index = this.articles.indexOf(article);
    if (index > -1) { this.articles.splice(index, 1); }
   }

  navigateToArticleDetail(articleId: string): void {
    this.navController.navigateForward('/article/' + articleId);
  }

  navigateToNewArticle(): void {
    this.navController.navigateForward('/new-article');
  }
}
