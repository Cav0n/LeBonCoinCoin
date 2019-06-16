import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/model/Article';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input()
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private user: UserService
  ) { }

  ngOnInit() {
  }
}
