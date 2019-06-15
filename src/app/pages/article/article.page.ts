import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  articleName = 'Nom de l\'article';
  id = null;

  constructor(private activatedRoute: ActivatedRoute) { }

 ngOnInit() {
   this.id = this.activatedRoute.snapshot.paramMap.get('id');
 }

}
