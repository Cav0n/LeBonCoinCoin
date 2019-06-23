import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from 'src/model/Article';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { User } from 'src/model/User';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  article;
  vendeur;
  currentUser;
  articleid;

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private emailComposer: EmailComposer,
    private userService: UserService,
    private navController: NavController) {
      this.articleid = this.activatedRoute.snapshot.paramMap.get('id');
      this.article = this.afs.collection('articles').doc<Article>(this.articleid).valueChanges().pipe(
        take(1),
        map(article => {
          return article;
        })
      ).subscribe(article => {
        this.article = article;
        this.vendeur = this.afs.collection('users').doc<User>(this.article.vendeur).valueChanges().pipe(take(1), map(user => { return user })).subscribe(vendeur => { this.vendeur = vendeur});
        this.currentUser = this.userService.currentUser;
      });
  }

 ngOnInit() {
 }

 contactSeller() {
      const email = {
        to: this.vendeur.mail,
        cc: '',
        bcc: [],
        attachments: [],
        subject: this.article.nom +  ' sur LeBonCoinCoin',
        body: '',
        isHtml: true
      };

      this.emailComposer.open(email);
  }

  deleteArticle(){
    if(this.vendeur.id == this.currentUser.id){
      this.afs.collection('articles').doc<Article>(this.articleid).delete();
      this.navController.back();
    }
  }
}

