import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/model/Article';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/model/User';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input()
  article: Article;

  vendeur;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private user: UserService
  ) { }

  ngOnInit() {
    this.vendeur = this.afs.collection('users').doc<User>(this.article.vendeur).valueChanges().pipe(take(1), map(user => { return user })).subscribe(vendeur => { this.vendeur = vendeur});
  }
}
