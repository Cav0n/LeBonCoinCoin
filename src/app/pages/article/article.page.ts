import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

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
  let articleid = this.activatedRoute.snapshot.paramMap.get('id');
  console.log(articleid + this.article);
 }

}
