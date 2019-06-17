import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from 'src/model/Article';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  article;
  articleid;

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore) {
    }

 ngOnInit() {

  this.articleid = this.activatedRoute.snapshot.paramMap.get('id');
  this.article = this.afs.collection('articles').doc<Article>(this.articleid).valueChanges().pipe(
    take(1),
    map(article => {
      article.id = this.articleid
      return article;
    })
  ).subscribe(article => {
    this.article = article;
  });
 }

}