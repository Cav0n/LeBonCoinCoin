import { ArticlePage } from './../article/article.page';
import { Component } from '@angular/core';
import { Article } from 'src/model/Article';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss']
})
export class AccueilPage {

  articles;

  constructor(
    public navController: NavController,
    private afs: AngularFirestore
    ) {
     this.articles = afs.collection('articles').valueChanges();
   }

  deleteArticle(article: Article) {
    const index = this.articles.indexOf(article);
    if (index > -1) { this.articles.splice(index, 1); }
   }
}
