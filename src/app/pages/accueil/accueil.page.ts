import { Component } from '@angular/core';
import { Article } from 'src/model/Article';

@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss']
})
export class AccueilPage {

  articles = [
    new Article('1', 'Article1', 'Description1', 'PouikPouik', 'Voiture', '12/12/2012', 'Chamboeuf', '12,78'),
    new Article('2', 'Article2', 'Description2', 'PouikPouik', 'Voiture', '12/12/2012', 'Chamboeuf', '12,78'),
    new Article('3', 'Article3', 'Description3', 'PouikPouik', 'Voiture', '12/12/2012', 'Chamboeuf', '12,78'),
    new Article('4', 'Article4', 'Description4', 'PouikPouik', 'Voiture', '12/12/2012', 'Chamboeuf', '12,78'),
    new Article('5', 'Article5', 'Description5', 'PouikPouik', 'Voiture', '12/12/2012', 'Chamboeuf', '12,78'),
  ]

  constructor() {  }

  deleteArticle(article: Article) {
    const index = this.articles.indexOf(article);
    if (index > -1) { this.articles.splice(index, 1); }
   }


}
