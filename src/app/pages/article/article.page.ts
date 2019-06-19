import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from 'src/model/Article';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

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
    private afs: AngularFirestore,
    private emailComposer: EmailComposer) {
  }

 ngOnInit() {

  this.articleid = this.activatedRoute.snapshot.paramMap.get('id');
  this.article = this.afs.collection('articles').doc<Article>(this.articleid).valueChanges().pipe(
    take(1),
    map(article => {
      article.id = this.articleid;
      return article;
    })
  ).subscribe(article => {
    this.article = article;
  });
 }

 contactSeller() {
      const email = {
        to: 'this.article.vendeur',
        cc: '',
        bcc: [],
        attachments: [],
        subject: this.article.nom +  ' sur LeBonCoinCoin',
        body: '',
        isHtml: true
      };

      this.emailComposer.open(email);
}
}

