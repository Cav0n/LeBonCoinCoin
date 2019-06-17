import { ArticlePage } from './../article/article.page';
import { Component } from '@angular/core';
import { Article } from 'src/model/Article';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss']
})
export class AccueilPage {

  articles = [
    new Article('1', 'Article1', 'Description1', 'Vendeur1', 'Catégorie1', 'DateDeMiseEnLigne1', 'Ville1', '11,11'),
    new Article('2', 'Article2', 'Description2', 'Vendeur2', 'Catégorie2', 'DateDeMiseEnLigne2', 'Ville2', '12,12'),
    new Article('3', 'Article3', 'Description3', 'Vendeur3', 'Catégorie3', 'DateDeMiseEnLigne3', 'Ville3', '13,13'),
    new Article('4', 'Article4', 'Description4', 'Vendeur4', 'Catégorie4', 'DateDeMiseEnLigne4', 'Ville4', '14,14'),
    new Article('5', 'Article5', 'Description5', 'Vendeur5', 'Catégorie5', 'DateDeMiseEnLigne5', 'Ville4', '15,15'),
  ];

  constructor(public navController: NavController) {  }

  deleteArticle(article: Article) {
    const index = this.articles.indexOf(article);
    if (index > -1) { this.articles.splice(index, 1); }
   }

  navigateToOtherPage(articleId: string): void {
    this.navController.navigateForward('/article/' + articleId);
  }
}
