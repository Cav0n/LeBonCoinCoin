import { Article } from 'src/model/Article';
import { Component, OnInit } from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
  }

}
